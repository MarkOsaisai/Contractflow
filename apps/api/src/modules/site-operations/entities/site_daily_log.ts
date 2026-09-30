import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Contract } from "./contract";
import { ContractSite } from "./contract_site";
import { ContractParty } from "./contract_party";
import { CompanyUser } from "./company_user";
import { BaseCustomEntity } from "./base_custom_entity";

export enum WeatherCondition {
    CLEAR = "clear",
    CLOUDY = "cloudy",
    PARTLY_CLOUDY = "partly_cloudy",
    RAINY = "rainy",
    HEAVY_RAIN = "heavy_rain",
    WINDY = "windy",
    STORMY = "stormy",
    FOGGY = "foggy",
    HOT = "hot",
    COLD = "cold",
    SNOWY = "snowy",
    HAIL = "hail"
}
export enum SiteStatus {
    ON_SCHEDULE = "on_schedule",
    AHEAD_OF_SCHEDULE = "ahead_of_schedule",
    BEHIND_SCHEDULE = "behind_schedule",
    DELAYED = "delayed",
    SUSPENDED = "suspended",
    COMPLETED = "completed",
    AT_RISK = "at_risk",
    HOLD = "hold",
    CLOSED = "closed"
}

@Entity("site_daily_log")
export class SiteDailyLog extends BaseCustomEntity{

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

    @Column({name: "contract_party_id", type: "varchar", length: 26})
    contractPartyId!: string
    @ManyToOne(() => ContractParty, {onDelete:"CASCADE"})
    @JoinColumn({name:"contract_party_id", referencedColumnName: "id"})
    contractParty!: ContractParty 

    @Column({name: "log_date", type: "date"})
    logDate!: Date

    @Column({name:"weather_condition", type:"enum", enum: WeatherCondition})
    weatherCondition!: WeatherCondition

    @Column({name:"temperature_celsius", type: "smallint"})
    temperatureCelsius!: number

    @Column({name: "weather_delay_minutes", type: "int"})
    weatherDelayMinutes!: number

    @Column({name: "work_performed", type: "text"})
    workPerformed!: string 

    @Column({name: "work_planned_next", type: "text"})
    workPlannedNext!: string

    @Column({name: "issues_and_delays", type: "text"})
    issuesAndDelays!: string

    @Column({name:"status", type:"enum", enum:SiteStatus})
    status!: SiteStatus

    @Column({name: "submitted_at", type: "timestamptz"})
    submittedAt!: Date

    @Column({name: "submitted_by_id", type: "varchar", length: 26})
    submittedById!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name:"submitted_by_id", referencedColumnName: "id"})
    companyUser!: CompanyUser 

    @Column({name: "approved_at", type: "timestamptz"})
    approvedAt!: Date

    @Column({name: "approved_by_id", type: "varchar", length: 26})
    sapprovedById!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name:"approved_by_id", referencedColumnName: "id"})
    approvedcompanyUser!: CompanyUser 

    @Column({name: "rejection_reason", type: "text"})
    rejectionReason!: string
    
}