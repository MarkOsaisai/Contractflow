-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('CLIENT', 'CONTRACTOR', 'REGULATOR');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PLATFORM_ADMIN', 'ORGANIZATION_ADMIN', 'CLIENT_PM', 'CONTRACTOR_PM', 'HSE_OFFICER', 'FINANCE_OFFICER', 'VIEWER');

-- CreateEnum
CREATE TYPE "ContractStage" AS ENUM ('BID', 'AWARD', 'MOBILIZATION', 'EXECUTION', 'COMPLETION', 'COMMISSIONING', 'CLOSED');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('ACTIVE', 'ON_HOLD', 'BLOCKED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ComplianceStatus" AS ENUM ('PENDING', 'VALID', 'EXPIRED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VerificationSource" AS ENUM ('LIVE_JQS', 'MANUAL');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'PAID', 'DISPUTED');

-- CreateEnum
CREATE TYPE "AuditEventType" AS ENUM ('LOGIN', 'LOGOUT', 'FAILED_LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'DOCUMENT_UPLOAD', 'DOCUMENT_DOWNLOAD', 'DOCUMENT_DELETE', 'PERMISSION_CHANGE', 'LIFECYCLE_CHANGE', 'PAYMENT_CHANGE');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "clientOrganizationId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stage" "ContractStage" NOT NULL DEFAULT 'BID',
    "status" "ContractStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractParty" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContractParty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "currentVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentVersion" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "checksum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceRecord" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "certificateType" TEXT NOT NULL,
    "status" "ComplianceStatus" NOT NULL DEFAULT 'PENDING',
    "verificationSource" "VerificationSource" NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "verifiedById" TEXT,
    "expiresAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComplianceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMilestone" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amountKobo" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "dueDate" TIMESTAMP(3),
    "status" "PaymentStatus" NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "actorId" TEXT,
    "eventType" "AuditEventType" NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "oldValue" JSONB,
    "newValue" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "actorId" TEXT,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contractId" TEXT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_reference_key" ON "Contract"("reference");

-- CreateIndex
CREATE INDEX "Contract_organizationId_stage_status_idx" ON "Contract"("organizationId", "stage", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ContractParty_contractId_userId_key" ON "ContractParty"("contractId", "userId");

-- CreateIndex
CREATE INDEX "Document_contractId_category_idx" ON "Document"("contractId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentVersion_storageKey_key" ON "DocumentVersion"("storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentVersion_documentId_version_key" ON "DocumentVersion"("documentId", "version");

-- CreateIndex
CREATE INDEX "ComplianceRecord_contractId_status_expiresAt_idx" ON "ComplianceRecord"("contractId", "status", "expiresAt");

-- CreateIndex
CREATE INDEX "PaymentMilestone_contractId_status_dueDate_idx" ON "PaymentMilestone"("contractId", "status", "dueDate");

-- CreateIndex
CREATE INDEX "AuditLog_organizationId_entityType_entityId_createdAt_idx" ON "AuditLog"("organizationId", "entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "Activity_contractId_createdAt_idx" ON "Activity"("contractId", "createdAt");

-- CreateIndex
CREATE INDEX "Activity_organizationId_createdAt_idx" ON "Activity"("organizationId", "createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_createdAt_idx" ON "Notification"("userId", "readAt", "createdAt");

-- CreateIndex
CREATE INDEX "Notification_organizationId_createdAt_idx" ON "Notification"("organizationId", "createdAt");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_clientOrganizationId_fkey" FOREIGN KEY ("clientOrganizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractParty" ADD CONSTRAINT "ContractParty_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractParty" ADD CONSTRAINT "ContractParty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentVersion" ADD CONSTRAINT "DocumentVersion_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceRecord" ADD CONSTRAINT "ComplianceRecord_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMilestone" ADD CONSTRAINT "PaymentMilestone_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
