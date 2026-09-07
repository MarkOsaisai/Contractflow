-- =====================================================================
-- ContractFlow — PostgreSQL Schema
-- Converts the six source tables (Company, User, Contract, Stage,
-- Shared Document Vault, Shared Activity Log) into one database.
--
-- Assumptions made where the source table listed a "Dropdown" field
-- without giving its allowed values: those fields are created as
-- plain TEXT columns (flagged with a comment below) so the
-- application layer can define/extend the allowed values without a
-- schema migration. Every dropdown whose values WERE given in the
-- source table is implemented as a native PostgreSQL ENUM.
-- =====================================================================

CREATE SCHEMA IF NOT EXISTS contractflow;
SET search_path TO contractflow;

-- Needed for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================================
-- ENUM TYPES (only for dropdowns whose values were explicitly given)
-- =====================================================================

CREATE TYPE company_type_enum        AS ENUM ('Client', 'Contractor');
CREATE TYPE active_inactive_enum     AS ENUM ('Active', 'Inactive');
CREATE TYPE active_suspended_enum    AS ENUM ('Active', 'Suspended');
CREATE TYPE workspace_enum           AS ENUM ('HSE', 'Client', 'Finance', 'Contractor');
CREATE TYPE contract_type_enum       AS ENUM ('Service', 'Supply', 'EPC', 'Maintenance');
CREATE TYPE currency_enum            AS ENUM ('NGN', 'USD', 'EUR', 'GBP');
CREATE TYPE contract_status_enum     AS ENUM ('Draft', 'Active', 'Suspended', 'Completed');
CREATE TYPE document_type_enum       AS ENUM ('Contract', 'Certificate', 'Report', 'Invoice', 'HSE');
CREATE TYPE expiry_status_enum       AS ENUM ('Valid', 'Expiring', 'Expired');
CREATE TYPE verification_status_enum AS ENUM ('Pending', 'Verified', 'Rejected');
CREATE TYPE activity_type_enum       AS ENUM ('Upload', 'Approval', 'Payment', 'Comment', 'Submission');
CREATE TYPE action_result_enum       AS ENUM ('Success', 'Failure');

-- =====================================================================
-- COMPANY
-- =====================================================================
CREATE TABLE company (
    company_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name        TEXT NOT NULL,
    company_type         company_type_enum NOT NULL,
    registration_number  TEXT,
    tax_id                TEXT,
    jqs_number            TEXT,
    verification_status   TEXT,              -- dropdown values not specified in source
    address               TEXT,
    country               TEXT,
    contact_email          TEXT,
    contact_phone          TEXT,
    status                 active_inactive_enum NOT NULL DEFAULT 'Active',
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_company_email CHECK (contact_email IS NULL OR contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);
COMMENT ON TABLE  company IS 'A contractor or client organization using ContractFlow.';
COMMENT ON COLUMN company.jqs_number IS 'NCDMB / NipeX Joint Qualification System reference number.';

-- =====================================================================
-- APP_USER  (named app_user — "user" is a reserved word in PostgreSQL)
-- =====================================================================
CREATE TABLE app_user (
    user_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id    UUID NOT NULL REFERENCES company(company_id) ON DELETE CASCADE,
    full_name     TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    phone         TEXT,
    role          TEXT,                 -- dropdown values not specified in source
    workspace     workspace_enum NOT NULL,
    access_level  TEXT,                 -- dropdown values not specified in source
    status        active_suspended_enum NOT NULL DEFAULT 'Active',
    last_login    TIMESTAMPTZ,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_user_email CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);
COMMENT ON TABLE app_user IS 'An individual login belonging to a Company, scoped to one workspace.';

-- =====================================================================
-- CONTRACT
-- current_stage_id references STAGE, which itself references CONTRACT,
-- so the FK to stage is added later with ALTER TABLE to break the
-- circular dependency at creation time.
-- =====================================================================
CREATE TABLE contract (
    contract_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_number     TEXT NOT NULL UNIQUE,
    client_id            UUID NOT NULL REFERENCES company(company_id),
    contractor_id         UUID NOT NULL REFERENCES company(company_id),
    contract_title         TEXT NOT NULL,
    contract_type            contract_type_enum NOT NULL,
    start_date                DATE,
    end_date                   DATE,
    contract_value               NUMERIC(18,2),
    currency                      currency_enum NOT NULL DEFAULT 'NGN',
    scope                          TEXT,
    current_stage_id                 UUID,   -- FK added after STAGE table exists
    contract_status                   contract_status_enum NOT NULL DEFAULT 'Draft',
    project_location                    TEXT,
    project_manager_id                   UUID REFERENCES app_user(user_id),
    created_date                          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_date                           TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_contract_dates CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date),
    CONSTRAINT chk_contract_parties CHECK (client_id <> contractor_id)
);
COMMENT ON TABLE contract IS 'A single contract between a client Company and a contractor Company.';

-- =====================================================================
-- STAGE
-- =====================================================================
CREATE TABLE stage (
    stage_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id        UUID NOT NULL REFERENCES contract(contract_id) ON DELETE CASCADE,
    stage_number         INTEGER NOT NULL,
    stage_name             TEXT NOT NULL,
    description              TEXT,
    entry_date                DATE,
    target_date                 DATE,
    completion_date              DATE,
    stage_status                  TEXT,   -- dropdown values not specified in source
    owner_user_id                  UUID REFERENCES app_user(user_id),
    created_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_stage_sequence UNIQUE (contract_id, stage_number)
);
COMMENT ON TABLE stage IS 'One step in a contract''s lifecycle pipeline (e.g. Bid Acceptance, Execution, Commissioning).';

-- Now that STAGE exists, wire up the circular FK on CONTRACT.
ALTER TABLE contract
    ADD CONSTRAINT fk_contract_current_stage
    FOREIGN KEY (current_stage_id) REFERENCES stage(stage_id);

-- =====================================================================
-- DOCUMENT  (source: "Shared Document Vault")
-- =====================================================================
CREATE TABLE document (
    document_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id             UUID NOT NULL REFERENCES contract(contract_id) ON DELETE CASCADE,
    company_id                UUID NOT NULL REFERENCES company(company_id),
    uploaded_by_user_id         UUID NOT NULL REFERENCES app_user(user_id),
    document_name                 TEXT NOT NULL,
    document_type                    document_type_enum NOT NULL,
    document_category                   TEXT,   -- dropdown values not specified in source
    document_number                      TEXT,
    version                                TEXT,
    issue_date                              DATE,
    expiry_date                              DATE,
    expiry_status                             expiry_status_enum,   -- kept up to date by trigger below
    verification_status                        verification_status_enum NOT NULL DEFAULT 'Pending',
    verified_by_user_id                         UUID REFERENCES app_user(user_id),
    verification_date                            DATE,
    file_location                                 TEXT NOT NULL,
    access_level                                   TEXT,  -- dropdown values not specified in source
    upload_date                                     TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_updated                                     TIMESTAMPTZ NOT NULL DEFAULT now(),
    comments                                          TEXT
);
COMMENT ON TABLE document IS 'A certificate, permit, invoice, report, or contract document shared between a contract''s parties.';
COMMENT ON COLUMN document.expiry_status IS 'Auto-maintained by trg_document_expiry_status — do not set manually in the app layer.';

-- =====================================================================
-- ACTIVITY_LOG  (source: "Shared Activity Log")
-- =====================================================================
CREATE TABLE activity_log (
    activity_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id           UUID NOT NULL REFERENCES contract(contract_id) ON DELETE CASCADE,
    workspace               workspace_enum NOT NULL,
    user_id                   UUID NOT NULL REFERENCES app_user(user_id),
    activity_type               activity_type_enum NOT NULL,
    record_type                    TEXT,          -- e.g. Invoice / Document / Milestone / Incident
    record_id                       TEXT,          -- kept as TEXT: may point at rows in tables outside this schema (e.g. Milestone)
    old_status                       TEXT,
    new_status                        TEXT,
    activity_datetime                  TIMESTAMPTZ NOT NULL DEFAULT now(),
    comment                              TEXT,
    ip_device                             TEXT,
    action_result                          action_result_enum NOT NULL
);
COMMENT ON TABLE activity_log IS 'Append-only, cross-department audit trail for every contract.';

-- =====================================================================
-- INDEXES — foreign keys and the columns workspaces filter on most
-- =====================================================================
CREATE INDEX idx_user_company            ON app_user(company_id);
CREATE INDEX idx_contract_client         ON contract(client_id);
CREATE INDEX idx_contract_contractor     ON contract(contractor_id);
CREATE INDEX idx_contract_current_stage  ON contract(current_stage_id);
CREATE INDEX idx_stage_contract          ON stage(contract_id);
CREATE INDEX idx_document_contract       ON document(contract_id);
CREATE INDEX idx_document_company        ON document(company_id);
CREATE INDEX idx_document_expiry_date    ON document(expiry_date);
CREATE INDEX idx_document_expiry_status  ON document(expiry_status);
CREATE INDEX idx_activity_contract       ON activity_log(contract_id);
CREATE INDEX idx_activity_datetime       ON activity_log(activity_datetime);

-- =====================================================================
-- TRIGGERS
-- =====================================================================

-- 1) Generic "touch updated_at/updated_date/last_updated" trigger
CREATE OR REPLACE FUNCTION trg_set_updated_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'contract' THEN
        NEW.updated_date := now();
    ELSIF TG_TABLE_NAME = 'document' THEN
        NEW.last_updated := now();
    ELSE
        NEW.updated_at := now();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_company_updated  BEFORE UPDATE ON company   FOR EACH ROW EXECUTE FUNCTION trg_set_updated_timestamp();
CREATE TRIGGER trg_user_updated     BEFORE UPDATE ON app_user  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_timestamp();
CREATE TRIGGER trg_contract_updated BEFORE UPDATE ON contract  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_timestamp();
CREATE TRIGGER trg_stage_updated    BEFORE UPDATE ON stage     FOR EACH ROW EXECUTE FUNCTION trg_set_updated_timestamp();
CREATE TRIGGER trg_document_updated BEFORE UPDATE ON document  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_timestamp();

-- 2) Auto-calculate document.expiry_status from expiry_date.
--    Assumption: a document becomes "Expiring" inside a 30-day window
--    before its expiry_date. Adjust EXPIRING_WINDOW_DAYS as needed.
CREATE OR REPLACE FUNCTION trg_document_expiry_status()
RETURNS TRIGGER AS $$
DECLARE
    expiring_window_days CONSTANT INTEGER := 30;
BEGIN
    IF NEW.expiry_date IS NULL THEN
        NEW.expiry_status := NULL;
    ELSIF NEW.expiry_date < CURRENT_DATE THEN
        NEW.expiry_status := 'Expired';
    ELSIF NEW.expiry_date <= CURRENT_DATE + expiring_window_days THEN
        NEW.expiry_status := 'Expiring';
    ELSE
        NEW.expiry_status := 'Valid';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_document_expiry_status
    BEFORE INSERT OR UPDATE OF expiry_date ON document
    FOR EACH ROW EXECUTE FUNCTION trg_document_expiry_status();



CREATE TYPE incident_type_enum AS ENUM ('Near Miss', 'Injury', 'Equipment Fault', 'Leak', 'Unsafe Act');
CREATE TYPE severity_enum AS ENUM ('Low', 'Medium', 'High', 'Critical');
CREATE TYPE incident_status_enum AS ENUM ('Open', 'Investigating', 'Closed');

CREATE TYPE inspection_type_enum AS ENUM ('Toolbox Talk', 'PPE Check', 'Permit-to-Work', 'Site Walk');
CREATE TYPE inspection_result_enum AS ENUM ('Pass', 'Fail', 'Flagged');

CREATE TYPE approval_status_enum AS ENUM ('Compliant', 'Non-compliant', 'Pending');

CREATE TYPE milestone_status_enum AS ENUM ('Not Due', 'Pending', 'Approved', 'Paid');

CREATE TYPE payment_method_enum AS ENUM ('Bank Transfer', 'Cheque', 'Other');

-- ============================
-- HSE INCIDENT REPORT
-- ============================

CREATE TABLE hse_incident_report (
    incident_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id       UUID NOT NULL REFERENCES contract(contract_id),
    reported_by       UUID NOT NULL REFERENCES app_user(user_id),
    incident_type     incident_type_enum NOT NULL,
    severity          severity_enum NOT NULL,
    location           TEXT,
    description        TEXT,
    photo_reference    TEXT,
    reported_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    status             incident_status_enum NOT NULL DEFAULT 'Open',
    closed_date        TIMESTAMPTZ
);

-- ============================
-- HSE DAILY INSPECTION / CHECKLIST
-- ============================

CREATE TABLE hse_inspection (
    inspection_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id        UUID NOT NULL REFERENCES contract(contract_id),
    conducted_by       UUID NOT NULL REFERENCES app_user(user_id),
    inspection_type    inspection_type_enum NOT NULL,
    inspection_date    DATE NOT NULL,
    result             inspection_result_enum NOT NULL,
    notes              TEXT,
    follow_up_required BOOLEAN NOT NULL DEFAULT false
);

-- ============================
-- SITE DAILY LOG
-- ============================

CREATE TABLE site_daily_log (
    log_id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id        UUID NOT NULL REFERENCES contract(contract_id),
    logged_by          UUID NOT NULL REFERENCES app_user(user_id),
    log_date           DATE NOT NULL,
    work_summary       TEXT,
    headcount          INTEGER,
    weather            TEXT,
    equipment_on_site  TEXT,
    delays_blockers    TEXT,
    UNIQUE (contract_id, log_date, logged_by)
);

-- ============================
-- COMPLIANCE RECORD (individual worker certifications)
-- ============================

CREATE TABLE compliance_record (
    compliance_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id        UUID REFERENCES document(document_id),
    contract_id        UUID NOT NULL REFERENCES contract(contract_id),
    worker_name        TEXT NOT NULL,
    certification_type TEXT NOT NULL,
    approval_status    approval_status_enum NOT NULL DEFAULT 'Pending',
    reviewed_by        UUID REFERENCES app_user(user_id),
    review_date        DATE
);

-- ============================
-- MILESTONE
-- ============================

CREATE TABLE milestone (
    milestone_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id        UUID NOT NULL REFERENCES contract(contract_id),
    linked_stage_id    UUID REFERENCES stage(stage_id),
    milestone_name     TEXT NOT NULL,
    amount             NUMERIC(14,2) NOT NULL,
    currency           currency_enum NOT NULL DEFAULT 'NGN',
    due_date           DATE,
    status             milestone_status_enum NOT NULL DEFAULT 'Not Due'
);

-- ============================
-- PAYMENT
-- ============================

CREATE TABLE payment (
    payment_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    milestone_id       UUID NOT NULL REFERENCES milestone(milestone_id),
    amount_paid        NUMERIC(14,2) NOT NULL,
    payment_date       DATE NOT NULL,
    method             payment_method_enum NOT NULL,
    reference_no       TEXT,
    recorded_by        UUID NOT NULL REFERENCES app_user(user_id)
);

-- ============================
-- Helpful indexes
-- ============================

CREATE INDEX idx_incident_contract ON hse_incident_report(contract_id);
CREATE INDEX idx_inspection_contract ON hse_inspection(contract_id);
CREATE INDEX idx_sitelog_contract_date ON site_daily_log(contract_id, log_date);
CREATE INDEX idx_compliance_contract ON compliance_record(contract_id);
CREATE INDEX idx_milestone_contract ON milestone(contract_id);
CREATE INDEX idx_payment_milestone ON payment(milestone_id);
-- =====================================================================
-- End of schema
-- =====================================================================
