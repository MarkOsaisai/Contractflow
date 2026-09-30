import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn} from "typeorm";
import { Contract } from "./contract";
import { ContractSite } from "./contract_site";
import { CompanyUser } from "./company_user";
import { BaseCustomEntity } from "./base_custom_entity";


export enum HseInspectionType{
    SAFETY="safety",
    ENVIRONMENTAL="environmental",
    HEALTH="health",
    OTHER="other"
}
export enum HseInspectionStatus{
    PENDING="pending",
    IN_PROGRESS="in_progress",
    COMPLETED="completed",
    CANCELLED="cancelled"
}
export enum HseOverallResult{
    PASS="pass",
    FAIL="fail",
    INCONCLUSIVE="inconclusive"
}

@Entity("hse_inspection")
export class HseInspection extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    @ManyToOne(() => Contract, {onDelete:"CASCADE"})
    @JoinColumn({name:"contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "contract_site_id", type: "varchar", length: 26})
    contractSiteId!: string
    @ManyToOne(() => ContractSite, {onDelete:"CASCADE"})
    @JoinColumn({name:"contract_site_id", referencedColumnName: "id"})
    contractSite!: ContractSite   
    
    @Column({name: "inspector_company_user_id", type: "varchar", length: 26})
    inspectorCompanyUserId!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name:"company_id", referencedColumnName: "id"})
    CompanyUser!: CompanyUser

    @Column({name: "reference_number", type:"varchar", length:40})
    referenceNumber!: string

    @Column({name: "inspection_type", type:"enum", enum: HseInspectionType})
    inspectionType!: HseInspectionType

    @Column({name: "status", type:"enum", enum: HseInspectionStatus})
    status!: HseInspectionStatus

    @Column({name: "scheduled_date", type:"date"})
    scheduledDate!: Date

    @Column({name: "conducted_at", type:"timestamptz"})
    conductedAt!: Date

    @Column({name: "external_inspector_first_name", type:"varchar", length:100})
    externalInspectorFirstName!: string

    @Column({name: "external_inspector_last_name", type:"varchar", length:100})
    externalInspectorLastName!: string

    @Column({name: "external_inspector_organization", type:"varchar", length:255})
    externalInspectorOrganization!: string

    @Column({name: "overall_result", type:"enum", enum: HseOverallResult})
    overallResult!: HseOverallResult

    @Column({name: "score_bps", type:"int"})
    scoreBps!: number

    @Column({name: "summary", type:"text"})
    summary!: string

}