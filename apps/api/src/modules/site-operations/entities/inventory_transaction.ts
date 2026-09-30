import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Contract } from "./contract";
import { InventoryItem } from "./inventory_item";
import { SiteDailyLog } from "./site_daily_log";
import { CompanyUser } from "./company_user";
import { BaseCustomEntity } from "./base_custom_entity";

export enum TransactionType {
    RECEIPT = 'receipt',
    ISSUE = 'issue',
    ADJUSTMENT = 'adjustment',
    TRANSFER = 'transfer',
    RETURN = 'return'
}


@Entity("inventory_transaction")
export class InventoryTransaction extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    @ManyToOne(() => Contract,{onDelete:"CASCADE"})
    @JoinColumn({name: "contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "inventory_item_id", type: "varchar", length: 26})
    inventoryItemId!: string
    @ManyToOne(() => InventoryItem)
    @JoinColumn({name: "inventory_item_id", referencedColumnName: "id"})
    inventoryItem!: InventoryItem

    @Column({name: "site_daily_log_id", type: "varchar", length: 26})
    siteDailyLogId!: string
    @ManyToOne(() => SiteDailyLog)
    @JoinColumn({name: "site_daily_log_id", referencedColumnName: "id"})
    siteDailyLog!: SiteDailyLog

    @Column({name: "transaction_type", type: "enum", enum: TransactionType})
    transactionType!: TransactionType

    @Column({name: "quantity_milli", type: "bigint"})
    quantityMilli!: number

    @Column({name: "unit_cost_minor", type: "bigint"})
    unitCostMinor!: number

    @Column({name: "currency_code", type: "varchar", length: 3})
    currencyCode!: string
    
    @Column({name: "reference_number", type: "varchar", length: 100})
    referenceNumber!: string

    @Column({name: "counterparty_name", type: "varchar", length: 255})
    counterPartyName!: string

    @Column({name: "transaction_at", type: "timestamptz"})
    transactionAt!: string

    @Column({name: "performed_by_id", type: "varchar", length: 26})
    performedById!: string
    @ManyToOne(() => CompanyUser)
    @JoinColumn({name: "performed_by_id", referencedColumnName: "id"})
    companyUser!: CompanyUser

    @Column({name: "remarks", type: "text"})
    remarks!: string
}