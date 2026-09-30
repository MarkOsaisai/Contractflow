import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Invoice } from "./invoice";
import { Milestone } from "./milestone";
import { BaseCustomEntity } from "./base_custom_entity";



@Entity("invoice_line_item")
export class InvoiceLineItem extends BaseCustomEntity{

    @Column({name: "invoice_id", type: "varchar", length: 26})
    invoiceId!: string
    @ManyToOne(() => Invoice)
    @JoinColumn({name: "invoice_id", referencedColumnName: "id"})
    invoice!: Invoice

    @Column({name: "milestone_id", type: "varchar", length: 26})
    milestoneId!: string
    @ManyToOne(() => Milestone, {onDelete:"CASCADE"})
    @JoinColumn({name: "milestone_id", referencedColumnName: "id"})
    milestone!: Milestone

    @Column({name: "line_number", type: "int"})
    lineNumber!: number

    @Column({name: "description", type: "varchar", length: 500})
    description!: string

    @Column({name: "quantity_milli", type: "bigint"})
    quantityMilli!: number

    @Column({name: "unit_of_measure", type: "varchar", length: 20})
    unitOfMeasure!: string

    @Column({name: "unit_price_minor", type: "bigint"})
    unitPriceMinor!: number

    @Column({name: "amount_minor", type: "bigint"})
    amountMinor!: number

    @Column({name: "currency_code", type: "char", length: 3})
    currencyCode!: string
}