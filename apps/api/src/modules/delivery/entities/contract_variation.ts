import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Contract } from "./contract";
import { CompanyUser } from "./company_user";
import { ContractParty } from "./contract_party";
import { BaseCustomEntity } from "./base_custom_entity";


export enum ContractVariationType{
    SCOPE_CHANGE = 'scope_change',
    TIME_EXTENSION = 'time_extension',
    COST_ADJUSTMENT = 'cost_adjustment',
    PRICE_REVISON = 'price_revision',
    SCHEDULE_CHANGE = 'schedule_change',
    DESIGN_CHANGE = 'design_change',
    TECHNICAL_CHANGE = 'technical_change',
    PROCUREMENT_CHANGE = 'procurement_change',
    MATERIAL_CHANGE = 'material_change',
    REGULATORY_CHANGE = 'regulatory_change',
    OTHER = 'other'
}

export enum ContractVariationStatus{
    DRAFT = 'draft',
    SUBMITTED = 'submitted',
    UNDER_REVIEW = 'under_review',
    PENDING_APPROVAL = 'pending_approval',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    NEGOTIATING = 'negotiating',
    IMPLEMENTED = 'implemented',
    CANCELLED = 'cancelled',
    WITHDRAWN = 'withdrawn'
}

@Entity("contract_variation")
export class ContractVariation extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    @ManyToOne(() => Contract, {onDelete:"CASCADE"})
    @JoinColumn({name: "contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "raised_by_party_id", type: "varchar", length: 26})
    raisedByPartyId!: string
    @ManyToOne(() => ContractParty, {onDelete:"CASCADE"})
    @JoinColumn({name: "raised_by_party_id", referencedColumnName: "id"})
    raisedByParty!: ContractParty

    @Column({name: "reference_number", type: "varchar", length: 40})
    referenceNumber!: string

    @Column({name: "title", type: "varchar", length: 255})
    title!: string

    @Column({name: "description", type: "text"})
    description!: string

    @Column({name: "variation_type", type: "enum", enum: ContractVariationType})
    variationType!: ContractVariationType

    @Column({name: "status", type: "enum", enum: ContractVariationStatus})
    status!: ContractVariationStatus

    @Column({name: "amount_delta_minor", type: "bigint"})
    amountDeltaMinor!: number

    @Column({name: "currency_code", type: "char", length: 3})
    currencyCode!: string

    @Column({name: "time_extension_days", type: "int"})
    timeExtensionDays!: number

    @Column({name: "submitted_at", type: "timestamptz"})
    submittedAt!: Date

    @Column({name: "submitted_by_id", type: "varchar", length: 26})
    submittedById!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name: "submitted_by_id", referencedColumnName: "id"})
    submittedBy!: CompanyUser

    @Column({name: "decided_at", type: "timestamptz"})
    decidedAt!: Date

    @Column({name: "decided_by_id", type: "varchar", length: 26})
    decidedById!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name: "decided_by_id", referencedColumnName: "id"})
    decidedBy!: CompanyUser

    @Column({name: "decision_note", type: "text"})
    decisionNote!: string 

 
}