import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Contract } from "./contract";
import { CompanyUser } from "./company_user";
import { BaseCustomEntity } from "./base_custom_entity";


export enum FromStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    UNDER_REVIEW = 'under_review'
}
export enum ToStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    UNDER_REVIEW = 'under_review'
}

@Entity("contract_status_history")
export class ContractStatusHistory extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    @ManyToOne(() => Contract, {onDelete:"CASCADE"})
    @JoinColumn({name:"contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "from_status", type: "enum", enum: FromStatus})
    fromStatus!: FromStatus

    @Column({name: "to_status", type: "enum", enum: ToStatus})
    toStatus!: ToStatus

    @Column({name: "reason", type: "text"})
    reason!: string

    @Column({name: "changed_by_id", type: "varchar", length: 26})
    changedById!: string
    
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name:"changed_by_id", referencedColumnName: "id"})
    changedBy!: CompanyUser

    @Column({name: "changed_at", type: "timestamptz"})
    changedAt!: Date

}