import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Contract } from './contract';
import { ComplianceRequirement } from './compliance_requirement';
import { ContractParty } from './contract_party';
import { CompanyUser } from './company_user';
import { BaseCustomEntity } from '../../cross-cutting/entities/base_custom_entity';

export enum ComplianceRecordStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  VALID = 'valid',
  EXPIRED = 'expired',
  RENEWAL_DUE = 'renewal_due',
  RENEWED = 'renewed',
  UNDER_REVIEW = 'under_review',
  REJECTED = 'rejected',
  NON_COMPLIANT = 'non_compliant',
  WAIVED = 'waived',
  CANCELLED = 'cancelled',
}

@Entity('compliance_record')
export class ComplianceRecord extends BaseCustomEntity {
  @Column({ name: 'contract_id', type: 'varchar', length: 26 })
  contractId!: string;
  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  contract!: Contract;

  @Column({ name: 'compliance_requirement_id', type: 'varchar', length: 26 })
  complianceRequirementId!: string;
  @ManyToOne(() => ComplianceRequirement, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compliance_requirement_id', referencedColumnName: 'id' })
  complianceRequirement!: ComplianceRequirement;

  @Column({ name: 'contract_party_id', type: 'varchar', length: 26 })
  contractPartyId!: string;
  @ManyToOne(() => ContractParty, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_party_id', referencedColumnName: 'id' })
  ContractParty!: ContractParty;

  @Column({ name: 'reference_number', type: 'varchar', length: 100 })
  referenceNumber!: string;

  @Column({ name: 'issuing_authority', type: 'varchar', length: 255 })
  issuingAuthority!: string;

  @Column({ name: 'issue_date', type: 'date' })
  issueDate!: Date;

  @Column({ name: 'expiry_date', type: 'date' })
  expiryDate!: Date;

  @Column({ name: 'covered_amount_minor', type: 'bigint' })
  coveredAmountMinor!: number;

  @Column({ name: 'currency_code', type: 'char', length: 3 })
  currencyCode!: string;

  @Column({ name: 'status', type: 'enum', enum: ComplianceRecordStatus })
  status!: ComplianceRecordStatus;

  @Column({ name: 'verified_at', type: 'timestamptz' })
  verifiedAt!: Date;

  @Column({ name: 'verified_by_id', type: 'varchar', length: 26 })
  verifiedById!: string;
  @ManyToOne(() => CompanyUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'verified_by_id', referencedColumnName: 'id' })
  verifiedBy!: CompanyUser;

  @Column({ name: 'remarks', type: 'text' })
  remarks!: string;
}
