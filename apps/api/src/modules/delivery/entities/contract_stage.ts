import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Contract } from "./contract";
import { BaseCustomEntity } from "./base_custom_entity";


export enum Status{
    PLANNED = 'planned',
    ACTIVE = 'active',
    IN_PROGRESS = 'in_progress',
    PENDING_APPROVAL = 'pending_approval',
    COMPLETED = 'completed',
    DELAYED = 'delayed',
    CANCELLED = 'cancelled'
}

@Entity("contract_stage")
export class ContractStage extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    
    @ManyToOne(() => Contract, {onDelete:"CASCADE"})
    @JoinColumn({name:"contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "name", type: "varchar", length: 255})
    name!: string

    @Column({name: "description", type: "text"})
    description!: string

    @Column({name: "sequence", type: "int"})
    sequence!: string

    @Column({name: "status", type: "enum", enum: Status})
    status!: Status

    @Column({name:"weight_bps", type: "int"})
    weightBps!: number

    @Column({name: "planned_start_date", type: "date"})
    plannedStartDate!: Date

    @Column({name: "planned_end_date", type: "date"})
    plannedEndDate!: Date

    @Column({name: "actual_start_date", type: "date"})
    actualStartDate!: Date

    @Column({name: "actual_end_date", type: "date"})
    actualEndDate!: Date

}