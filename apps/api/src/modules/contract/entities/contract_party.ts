import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Contract } from './contract';
import { Company } from '../../identity/entities/company';
import { BaseCustomEntity } from '../../cross-cutting/entities/base_custom_entity';

export enum PartyType {
  CLIENT = 'client',
  CONTRACTOR = 'contractor',
  SUBCONTRACTOR = 'subcontractor',
  VENDOR = 'vendor',
  OTHER = 'other',
}

@Entity('contract_party')
export class ContractParty extends BaseCustomEntity {
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

  @Column({ name: 'party_type', type: 'enum', enum: PartyType })
  partyType!: PartyType;

  @Column({ name: 'signatory_first_name', type: 'varchar', length: 100 })
  signatoryFirstName!: string;

  @Column({ name: 'signatory_last_name', type: 'varchar', length: 100 })
  signatoryLastName!: string;

  @Column({ name: 'signatory_title', type: 'varchar', length: 150 })
  signatoryTitle!: string;

  @Column({ name: 'signed_at', type: 'timestamptz' })
  signedAt!: Date;
}
