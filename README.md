# ContractFlow

ContractFlow is an oil and gas contract operations platform covering bid through commissioning.

## Workspace layout

- `apps/web`: Next.js dashboard
- `apps/api`: NestJS REST API
- `packages/contracts`: shared API and domain contracts
- `infra`: local PostgreSQL, Redis, and S3-compatible object storage

## Local setup

1. Copy `apps/api/.env.example` to `apps/api/.env`.
2. Start infrastructure: `docker compose -f infra/docker-compose.yml up -d`.
3. Install dependencies: `npm install`.
4. Generate the Prisma client: `npm run prisma:generate --workspace=@contractflow/api`.
5. Apply local migrations: `npm run prisma:migrate --workspace=@contractflow/api`.
6. Run the web app: `npm run dev:web`.
7. Run the API: `npm run dev:api`.

The API is served on `http://localhost:3001/api/v1`; Swagger is available at `/api/docs`.

# ContractFlow Workspace Dashboard KPIs

**NDI Group 2**

This document lists the key performance indicators shown on the dashboard of each of ContractFlow's four department workspaces — Contractor, Client Project Management, HSE, and Finance.

Each KPI maps directly to the existing data model:

- Contract
- Stage
- Document
- Compliance Record
- Milestone
- Payment
- Activity Log

Nothing here requires data beyond what the schema already captures.

---

## Contractor Workspace

| KPI                                      | What It Shows                                                  |
| ---------------------------------------- | -------------------------------------------------------------- |
| **Compliance Status**                    | Overall standing — compliant / needs attention / non-compliant |
| **Documents Expiring in 30 Days**        | Count of certs/permits approaching expiry                      |
| **Documents Expired**                    | Count of lapsed documents blocking site access                 |
| **Current Contract Stage**               | Where the active contract sits in the 7-stage pipeline         |
| **Next Milestone Due**                   | Milestone name, amount, and due date                           |
| **Payment Status**                       | Not due / pending / approved / paid, for the active milestone  |
| **Open Blockers Assigned to Contractor** | Count of issues waiting on contractor action                   |

---

## Client Project Management Workspace

| KPI                             | What It Shows                                                       |
| ------------------------------- | ------------------------------------------------------------------- |
| **Active Contracts by Stage**   | Count of contracts at each of the 7 stages                          |
| **Contracts Needing Attention** | Count flagged non-compliant or blocked                              |
| **Average Time per Stage**      | Cycle time — how long contracts typically sit in each stage         |
| **Open Blockers by Source**     | Count of blockers, broken down by HSE / Finance / Legal / Logistics |
| **Milestones Pending Approval** | Count awaiting Client PM sign-off                                   |
| **Contractor Compliance Rate**  | % of active contractors currently fully compliant                   |
| **Stalled Contracts**           | Contracts with no stage movement in X days                          |

---

## HSE Workspace

| KPI                                      | What It Shows                                      |
| ---------------------------------------- | -------------------------------------------------- |
| **Certifications Expiring in 7/30 Days** | Near-term compliance risk, split by urgency        |
| **Certifications Expired**               | Count currently lapsed, by contractor              |
| **Open Incidents**                       | Count by severity (low/medium/high/critical)       |
| **Incident Response Time**               | Average time from report to “investigating” status |
| **Inspection Pass Rate**                 | % of HSE inspections marked Pass in a given period |
| **Non-Compliant Contractors**            | Count currently restricted from site access        |
| **Pending Document Reviews**             | Count of uploaded documents awaiting verification  |

---

## Finance Workspace

| KPI                                          | What It Shows                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| **Total Milestone Value (Active Contracts)** | Sum of all milestone amounts across active contracts                      |
| **Payments Due This Period**                 | Count and value of milestones due in the next 7/30 days                   |
| **Payments Overdue**                         | Count and value of milestones past due date, unpaid                       |
| **Average Payment Cycle Time**               | Days from milestone approval to actual payment                            |
| **Payment Disputes/Held Invoices**           | Count of invoices flagged or on hold (e.g., PO mismatch)                  |
| **Payments Processed This Period**           | Total amount paid out, current week/month                                 |
| **Milestone Approval Backlog**               | Count of milestones pending Client PM approval before payment can proceed |

---

## Design Notes

- **Shared logic, different lens:** Several KPIs (compliance status, milestone status) appear in more than one workspace, but the scope differs. The Contractor sees their own numbers, Client PM and HSE see it rolled up across all contractors, and Finance sees it in monetary terms. This is consistent with the row-level permissions model established earlier.

- **Core problem indicators:** “Stalled Contracts” and “Non-Compliant Contractors” are the two KPIs that most directly answer the core problem statement — surfacing exactly who is holding up progress, which is the reason for building this over email-based tracking.

- **Data model alignment:** Every KPI here maps onto the Milestone, Compliance Record, Document, and Activity Log tables already in the ERD.

## Software Engineering Task Breakdown

**Schedule:** Aug 24 - Oct 23, 2026

Each Software Engineering task from the compressed sprint plan is broken into its component subtasks, followed by its dependencies. Dependencies may be internal to Software Engineering or cross-team dependencies on Cloud Computing or Data Analysis. Where a task has no dependency, it is the starting point of a chain.

### Sprint 1: Aug 24 - Aug 28, 2026

_Month 1 of the MVP_

**Sprint Goal:** Lock the data model, environment, and security architecture before any feature code is written.

1. Review the full requirements set against the proposal (1.5 days)
2. Finalize tech stack decisions (frontend, backend, database) (1.5 days)
3. Scaffold repositories and base project structure (1 day)
4. Draft API contract outline for core entities (1 day)

### Sprint 2: Aug 31 - Sep 4, 2026

_Month 1 of the MVP_

**Sprint Goal:** Turn the architecture into a working schema, wireframes, and an authentication scaffold ready for Sprint 3.

1. Implement the finalized data model as a working database schema (1.5 days)
2. Build the authentication scaffold (1.5 days)
3. Implement the initial role-based access control (RBAC) structure (1 day)
4. Circulate UI/UX wireframes for the four workspaces for review and sign-off (1 day)

### Sprint 3: Sep 7 - Sep 11, 2026

_Month 2 of the MVP_

**Sprint Goal:** Make the contract record real: live authentication, enforced access control, and the core entities every workspace depends on.

1. Build Company and User CRUD APIs and admin screens (1.5 days)
2. Wire authentication end-to-end (login, session handling, password reset) (1.5 days)
3. Enforce RBAC middleware across all API routes (1 day)
4. Build Contract and Stage entity APIs (1 day)

### Sprint 4: Sep 14 - Sep 18, 2026

_Month 2 of the MVP_

**Sprint Goal:** Give the contractor and the client their first real window into a live contract.

1. Build Contractor workspace UI: document list, upload flow, payment status view (1.5 days)
2. Build Client PM workspace UI: stage tracker, approvals list, blockers view (1.5 days)
3. Wire workspace navigation and role-based routing (1 day)
4. Integrate contract-status classification logic into both workspaces; fix Sprint 3 integration bugs (1 day)

### Sprint 5: Sep 21 - Sep 25, 2026

_Month 3 of the MVP_

**Sprint Goal:** Bring HSE into the platform: certification tracking, document vault, and expiry-aware compliance status.

1. Build the document vault: upload, storage reference, metadata (1.5 days)
2. Build expiry-status logic (valid, expiring, expired, pending) (1 day)
3. Build the HSE workspace UI: certification tracker table, approval status (1.5 days)
4. Build the initial JQS lookup integration (read-only); wire the vault into the Contractor upload flow (1 day)

### Sprint 6: Sep 28 - Oct 2, 2026

_Month 3 of the MVP_

**Sprint Goal:** Bring Finance into the platform and tie every workspace together with one shared activity log.

1. Build the Finance workspace UI: milestone ledger, payment status (1.5 days)
2. Build milestone-to-stage linkage logic (1 day)
3. Build the shared cross-department activity log (1.5 days)
4. Wire the activity log into the UI across all four workspaces; fix Sprint 5 integration bugs (1 day)

### Sprint 7: Oct 5 - Oct 9, 2026

_Month 4 of the MVP_

**Sprint Goal:** Prove the platform is secure, correct, and stable enough to carry a real contract.

1. Fix defects surfaced by the full-platform QA pass (1.5 days)
2. Complete encryption verification across all data at rest and in transit (1 day)
3. Complete the RBAC access-control test matrix (role x workspace x action) (1.5 days)
4. Finalize API documentation; prepare the code freeze for the pilot build (1 day)

### Sprint 8: Oct 12 - Oct 16, 2026

_Month 4 of the MVP_

**Sprint Goal:** Put one real contract, one real contractor, and one real client live on ContractFlow.

1. Run user acceptance testing (UAT) on one internal test contract; fix defects found (1.5 days)
2. Finalize training walkthroughs and in-app guidance for each workspace (1 day)
3. Support pilot contractor and client onboarding technically (1.5 days)
4. Final smoke test before go-live; provide go-live technical support (1 day)

### Pilot Readiness / Buffer: Oct 19 - Oct 23, 2026

- Pilot Readiness & Go-Live Buffer (5 days)
