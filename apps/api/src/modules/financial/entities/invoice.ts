import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Contract } from "./contract";
import { ContractParty } from "./contract_party";
import { CompanyUser } from "./company_user";
import { BaseCustomEntity } from "./base_custom_entity";


export enum InvoiceType{
    INTERIM = 'interim',
    FINAL = 'final',
    ADVANCE = 'advance',
    RETENTION = 'retention',
    VARIATION = 'variation',
    CLAIM = 'claim',
    DEBIT_NOTE = 'debit_note',
    CREDIT_NOTE = 'credit_note',
    PROFORMA = 'proforma',
    MISCELLANEOUS = 'miscellaneous'
}
export enum InvoiceStatus{
    DRAFT = 'draft',
    ISSUED = 'issued',
    SUBMITTED = 'submitted',
    PENDING_APPROVAL = 'pending_approval',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    PAID = 'paid',
    PARTIALLY_PAID = 'partially_paid',
    OVERDUE = 'overdue',
    DISPUTED = 'disputed',
    CANCELLED = 'cancelled',
    VOID = 'void'
}


@Entity("invoice")
export class Invoice extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    @ManyToOne(() => Contract, {onDelete:"CASCADE"})
    @JoinColumn({name: "contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "issued_by_party_id", type: "varchar", length: 26})
    issuedByPartyId!: string
    @ManyToOne(() => ContractParty, {onDelete:"CASCADE"})
    @JoinColumn({name: "issued_by_party_id", referencedColumnName: "id"})
    issuedByContractParty!: ContractParty

    @Column({name: "billed_to_party_id", type: "varchar", length: 26})
    billedToPartyId!: string
    @ManyToOne(() => ContractParty, {onDelete:"CASCADE"})
    @JoinColumn({name: "billed_by_party_id", referencedColumnName: "id"})
    billedToContractParty!: ContractParty

    @Column({name: "invoice_number", type: "varchar", length: 40})
    invoiceNumber!: string

    @Column({name: "invoice_type", type: "enum", enum: InvoiceType})
    invoiceType!: InvoiceType

    @Column({name: "status", type: "enum", enum: InvoiceStatus})
    status!: InvoiceStatus

    @Column({name: "issue_date", type: "date"})
    issueDate!: Date

    @Column({name: "due_date", type: "date"})
    dueDate!: Date

    @Column({name: "period_start", type: "date"})
    periodStart!: Date

    @Column({name: "period_end", type: "date"})
    periodEnd!: Date

    @Column({name: "currency_code", type: "char", length: 3})
    currencyCode!: string

    @Column({name: "gross_amount_minor", type: "bigint"})
    grossAmountMinor!: number

    @Column({name: "adjustments_total_minor", type: "bigint"})
    adjustmentsTotalMinor!: number

    @Column({name: "net_payable_minor", type: "bigint"})
    netPayableMinor!: number

    @Column({name: "amount_paid_minor", type: "bigint"})
    amountPaidMinor!: number

    @Column({name: "submitted_at", type: "timestamptz"})
    submittedAt!: Date

    @Column({name: "submitted_by_id", type: "varchar", length: 26})
    submittedById!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name: "submitted_by_id", referencedColumnName: "id"})
    submittedBy!: CompanyUser

    @Column({name: "certified_at", type: "timestamptz"})
    certifiedAt!: Date    

    @Column({name: "certified_by_id", type: "varchar", length: 26})
    certifiedById!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name: "certified_by_id", referencedColumnName: "id"})
    certifiedBy!: CompanyUser

    @Column({name: "rejection_reason", type: "text"})
    rejectionReason!: string  

}