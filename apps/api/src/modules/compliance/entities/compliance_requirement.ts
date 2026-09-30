import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Contract } from '../../contract/entities/contract';
import { BaseCustomEntity } from '../../cross-cutting/entities/base_custom_entity';

export enum ComplianceCategory {
  HSE = 'hse',
  ENVIRONMENTAL = 'environmental',
  PETROLEUM_LICENSING = 'petroleum_licensing',
  TAX_AND_ROYALTY = 'tax_and_royalty',
  LABOUR_AND_SAFETY = 'labour_and_safety',
  LOCAL_CONTENT = 'local_content',
  COMMUNITY_RELATIONS = 'community_relations',
  SECURITY_AND_PROTECTION = 'security_and_protection',
  INSURANCE_AND_INDEMNITY = 'insurance_and_indemnity',
  FINANCIAL_REPORTING = 'financial_reporting',
  ANTI_CORRUPTION = 'anti_corruption',
  DATA_AND_REPORTING = 'data_and_reporting',
}
export enum AppliesToParty {
  CONTRACTOR = 'contractor',
  SUBCONTRACTOR = 'subcontractor',
  SUPPLIER = 'supplier',
  CONSULTANT = 'consultant',
  OPERATOR = 'operator',
  JV_PARTNER = 'jv_partner',
  HOST_COMMUNITY = 'host_community',
  REGULATOR = 'regulator',
  INSURER = 'insurer',
  ALL_PARTIES = 'all_parties',
}

export enum ComplianceFrequency {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  HALF_YEARLY = 'half_yearly',
  YEARLY = 'yearly',
  EVENT_BASED = 'event_based',
  CONTINUOUS = 'continuous',
}

@Entity('compliance_requirement')
export class ComplianceRequirement extends BaseCustomEntity {
  @Column({ name: 'contract_id', type: 'varchar', length: 26 })
  contractId!: string;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  contract!: Contract;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name!: string;

  @Column({ name: 'description', type: 'text' })
  description!: string;

  @Column({ name: 'category', type: 'enum', enum: ComplianceCategory })
  category!: ComplianceCategory;

  @Column({ name: 'applies_to_party_type', type: 'enum', enum: AppliesToParty })
  appliesToPartyType!: AppliesToParty;

  @Column({ name: 'is_mandatory', type: 'boolean' })
  isMandatory!: boolean;

  @Column({ name: 'frequency', type: 'enum', enum: ComplianceFrequency })
  frequency!: ComplianceFrequency;

  @Column({ name: 'first_due_date', type: 'date' })
  firstDueDate!: Date;
}
