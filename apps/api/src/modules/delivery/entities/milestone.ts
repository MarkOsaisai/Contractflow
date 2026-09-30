import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Contract } from "./contract";
import { ContractStage } from "./contract_stage";
import { CompanyUser } from "./company_user";
import { BaseCustomEntity } from "./base_custom_entity";

export enum MilestoneStatus{
    PLANNED = 'planned',
    ACTIVE = 'active',
    IN_PROGRESS = 'in_progress',
    PENDING_APPROVAL = 'pending_approval',
    APPROVED = 'approved',
    COMPLETED = 'completed',
    DELAYED = 'delayed',
    AT_RISK = 'at_risk',
    ON_HOLD = 'on_hold',
    CANCELLED = 'cancelled'
}

@Entity("milestone")
export class Milestone extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    @ManyToOne(() => Contract, {onDelete:"CASCADE"})
    @JoinColumn({name: "contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "contract_stage_id", type: "varchar", length: 26})
    contractStageId!: string
    @ManyToOne(() => ContractStage, {onDelete:"CASCADE"})
    @JoinColumn({name: "contract_stage_id", referencedColumnName: "id"})
    contractStage!: ContractStage

    @Column({name: "title", type: "varchar", length: 255})
    title!: string

    @Column({name: "description", type: "text"})
    description!: string

    @Column({name: "sequence", type: "int"})
    sequence!: number

    @Column({name: "status", type: "enum", enum: MilestoneStatus})
    status!: MilestoneStatus

    @Column({name: "progress_bps", type: "int"})
    progressBps!: number

    @Column({name: "weight_bps", type: "int"})
    weightBps!: number

    @Column({name: "is_payment_milestone", type: "boolean"})
    isPaymentMilestone!: boolean

    @Column({name: "amount_minor", type: "bigint"})
    amountMinor!: number

    @Column({name: "currency_code", type: "char", length: 3})
    currencyCode!: string

    @Column({name: "due_date", type: "date"})
    dueDate!: Date

    @Column({name: "revised_due_date", type: "date"})
    revisedDueDate!: Date

    @Column({name: "completed_date", type: "date"})
    completedDate!: Date

    @Column({name: "submitted_at", type: "timestamptz"})
    submittedAt!: Date

    @Column({name: "submitted_by_id", type: "varchar", length: 26})
    submittedById!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name: "submitted_by_id", referencedColumnName: "id"})
    submittedBy!: CompanyUser

    @Column({name: "approved_at", type: "timestamptz"})
    approvedAt!: Date

    @Column({name: "approved_by_id", type: "varchar", length: 26})
    approvedById!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name: "approved_by_id", referencedColumnName: "id"})
    approvedBy!: CompanyUser

    @Column({name: "rejection_reason", type: "text"})
    rejectionReason!: string  
}