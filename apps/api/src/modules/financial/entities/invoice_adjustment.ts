import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Invoice } from "./invoice";
import { BaseCustomEntity } from "./base_custom_entity";


export enum InvoiceAdjustmentType{
    VAT = 'vat',
    WITHHOLDING_TAX = 'withholding_tax',
    RETENTION = 'retention',
    ADVANCE_PAYMENT = 'advance_payment',
    DISCOUNT = 'discount',
    PENALTY = 'penalty',
    LATE_PAYMENT_INTEREST = 'late_payment_interest',
    PRICE_ADJUSTMENT = 'price_adjustment',
    VARIATION = 'variation',
    CLAIM = 'claim',
    CREDIT_NOTE = 'credit_note',
    DEBIT_NOTE = 'debit_note',
    REVISION = 'revision',
    OTHER = 'other'
}

@Entity("invoice_adjustment")
export class InvoiceAdjustment extends BaseCustomEntity{

    @Column({name: "invoice_id", type: "varchar", length: 26})
    invoiceId!: string
    @ManyToOne(() => Invoice, {onDelete:"CASCADE"})
    @JoinColumn({name: "invoice_id", referencedColumnName: "id"})
    invoice!: Invoice

    @Column({name: "adjustment_type", type: "enum", enum: InvoiceAdjustmentType})
    adjustmentType!: InvoiceAdjustmentType

    @Column({name: "description", type: "varchar", length: 255})
    description!: string

    @Column({name: "rate_bps", type: "int"})
    rateBps!: number

    @Column({name: "base_amount_minor", type: "bigint"})
    baseAmountMinor!: number

    @Column({name: "amount_minor", type: "bigint"})
    amountMinor!: number

    @Column({name: "currency_code", type: "char", length: 3})
    currencyCode!: string


}