// User and authentication types
export type UserRole =
  | "PLATFORM_ADMIN"
  | "ORGANIZATION_ADMIN"
  | "CLIENT_PM"
  | "CONTRACTOR_PM"
  | "HSE_OFFICER"
  | "FINANCE_OFFICER"
  | "VIEWER";

export type Workspace = "contractor" | "client_pm" | "hse" | "finance";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  organizationName: string;
}

// Contract types
export type ContractStage =
  | "BID"
  | "AWARD"
  | "MOBILIZATION"
  | "EXECUTION"
  | "COMPLETION"
  | "COMMISSIONING"
  | "CLOSED";

export type ContractStatus =
  | "ACTIVE"
  | "ON_HOLD"
  | "BLOCKED"
  | "COMPLETED"
  | "CANCELLED";

export interface Contract {
  id: string;
  organizationId: string;
  clientOrganizationId: string;
  reference: string;
  title: string;
  stage: ContractStage;
  status: ContractStatus;
  createdAt: string;
  updatedAt: string;
  clientOrganization?: { id: string; name: string };
}

// Document types
export interface DocumentVersion {
  id: string;
  version: number;
  storageKey: string;
  contentType: string;
  sizeBytes: number;
  checksum: string;
  createdAt: string;
}

export interface Document {
  id: string;
  contractId: string;
  name: string;
  category: string;
  currentVersion: number;
  createdAt: string;
  updatedAt: string;
  versions?: DocumentVersion[];
}

// Payment types
export type PaymentStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "PAID" | "DISPUTED";

export interface PaymentMilestone {
  id: string;
  contractId: string;
  title: string;
  amount: number;
  currency: string;
  dueDate?: string;
  status: PaymentStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
}

// Activity types
export interface Activity {
  id: string;
  organizationId: string;
  contractId: string;
  actorId?: string;
  type: string;
  message: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  actor?: { id: string; displayName: string };
}

// Organization types
export interface Organization {
  id: string;
  name: string;
  industry?: string;
  address?: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}


