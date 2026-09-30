import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseCustomEntity } from "./base_custom_entity";


export enum ContractType{
    SERVICE= 'service', 
    SUPPLY= 'supply', 
    EPC= 'epc', 
    MAINTENANCE= 'maintenance'
}
export enum ContractStatus{
    DRAFT= 'draft', 
    ACTIVE= 'active', 
    SUSPENDED= 'suspended', 
    COMPLETED= 'completed'
}
export enum CurrencyType{
    NAIRA='NGN', 
    DOLLAR='USD', 
    EURO='EUR', 
    POUND='GBP'
}


@Entity("contract")
export class Contract extends BaseCustomEntity{

    @Column({name: "reference_number", type: "varchar", length:40, unique:true})
    referenceNumber!: string

    @Column({name: "title", type: "varchar", length:255})
    title!: string

    @Column({name: "description", type: "text"})
    description!: string

    @Column({name: "contract_type", type:"enum", enum: ContractType})
    contractType!: ContractType

    @Column({name: "status", type:"enum", enum: ContractStatus})
    status!: ContractStatus
    
    @Column({name: "parent_contract_id", type:"varchar", length: 26, nullable:true})
    parentContractId!: string
    @ManyToOne(()=> Contract, {onDelete: "CASCADE"})
    @JoinColumn({name: "parent_contract_id", referencedColumnName: "id"})
    parentContract!: Contract
    
    @Column({name: "original_value_minor", type:"bigint"})
    originalValueMinor!: number

    @Column({name: "current_value_minor", type:"bigint"})
    currentValueMinor!: number

    @Column({name: "currency_code", type:"enum", enum:CurrencyType, default: CurrencyType.DOLLAR})
    currencyCode!: CurrencyType

    @Column({name: "retention_rate_bps", type:"int"})
    retentionRateBps!: number

    @Column({name: "advance_payment_rate_bps", type:"int"})
    advancePaymentRateBps!: number

    @Column({name: "payment_terms_days", type:"int"})
    paymentTermsDays!: number

    @Column({name: "liquidated_damages_per_day_minor", type:"bigint"})
    liquidatedDamagesPerDayMinorr!: number

    @Column({name: "award_date", type:"date"})
    awardDate!: Date

    @Column({name: "start_date", type:"date"})
    startDate!: Date

    @Column({name: "end_date", type:"date"})
    endDate!: Date

    @Column({name: "revised_end_date", type:"date"})
    revisedEndDate!: Date

    @Column({name: "actual_completion_date", type:"date"})
    actualCompletionDate!: Date

    @Column({name: "defects_liability_days", type:"int"})
    defectsLiabilityDays!: number

    @Column({name: "timezone", type:"varchar", length:64})
    timezone!: string

}

