import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne} from "typeorm";
import { Contract } from "./contract";
import { HseIncident } from "./hse_incident";
import { HseInspectionFinding } from "./hse_inspection_finding";
import { CompanyUser } from "./company_user";
import { BaseCustomEntity } from "./base_custom_entity";

export enum HseCorrectiveActionPriority{
    LOW="low",
    MEDIUM="medium",
    HIGH="high"
}
export enum HseActionStatus{
    OPEN="open",
    IN_PROGRESS="in_progress",
    CLOSED="closed"
}

@Entity("hse_corrective_action")
export class HseCorrectiveAction extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    @ManyToOne(() => Contract, {onDelete:"CASCADE"})
    @JoinColumn({name:"contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "hse_incident_id", type: "varchar", length: 26})
    hseIncidentId!: string
    @OneToOne(() => HseIncident, {onDelete:"CASCADE"})
    @JoinColumn({name:"hse_incident_id"})
    hseIncident!: HseIncident

    @Column({name: "hse_inspection_finding_id", type: "varchar", length: 26})
    hseInspectionFindingId!: string
    @ManyToOne(() => HseInspectionFinding, {onDelete:"CASCADE"})
    @JoinColumn({name:"hse_inspection_finding_id", referencedColumnName: "id"})
    hseInspectionFinding!: HseInspectionFinding

    @Column({name: "assigned_to_company_user_id", type: "varchar", length: 26})
    assignedToCompanyUserId!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name:"assigned_to_company_user_id", referencedColumnName: "id"})
    companyUser!: CompanyUser

    @Column({name: "description", type:"text"})
    description!: string

    @Column({name: "priority", type:"enum", enum:HseCorrectiveActionPriority})
    priority!: HseCorrectiveActionPriority  

    @Column({name: "status", type:"enum", enum:HseActionStatus})
    status!: HseActionStatus

    @Column({name: "due_date", type:"date"})
    dueDate!: Date

    @Column({name: "completed_at", type:"timestamptz"})
    completedAt!: Date

    @Column({name: "verified_at", type:"timestamptz"})
    verifiedAt!: Date

    @Column({name: "verified_by_id", type: "varchar", length: 26})
    verifiedId!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name:"verified_by_id", referencedColumnName: "id"})
    verifiedCompanyUser!: CompanyUser

    @Column({name: "closure_note", type:"text"})
    closureNote!: string
    
}