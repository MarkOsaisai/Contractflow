import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Contract } from '../../contract/entities/contract';
import { Company } from '../../identity/entities/company';
import { CompanyUser } from '../../identity/entities/company_user';
import { BaseCustomEntity } from './base_custom_entity';

@Entity('activity_log')
export class ActivityLog extends BaseCustomEntity {
  @Column({ name: 'contract_id', type: 'varchar', length: 26 })
  contractId!: string;
  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  contract!: Contract;

  @Column({ name: 'company_id', type: 'varchar', length: 26 })
  companyId!: string;
  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company!: Company;

  @Column({ name: 'actor_user_id', type: 'varchar', length: 26 })
  actorUserId!: string;
  @ManyToOne(() => CompanyUser)
  @JoinColumn({ name: 'actor_user_id', referencedColumnName: 'id' })
  actorUser!: CompanyUser;

  @Column({ name: 'action', type: 'varchar', length: 100 })
  action!: string;

  @Column({ name: 'entity_type', type: 'varchar', length: 60 })
  entityType!: string;

  @Column({ name: 'entity_id', type: 'uuid' })
  entityId!: string;

  @Column({ name: 'summary', type: 'varchar', length: 500 })
  summary!: string;

  @Column({ name: 'changes', type: 'jsonb' })
  changes!: Record<string, any>;

  @Column({ name: 'metadata', type: 'jsonb' })
  metadata!: Record<string, any>;

  @Column({ name: 'ip_address', type: 'inet' })
  ipAddress!: string;

  @Column({ name: 'user_agent', type: 'varchar' })
  userAgent!: string;

  @Column({ name: 'request_id', type: 'uuid' })
  requestId!: string;

  @Column({ name: 'occurred_at', type: 'timestamptz' })
  occurredAt!: Date;
}
