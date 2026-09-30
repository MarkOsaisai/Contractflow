import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Contract } from "./contract";
import { BaseCustomEntity } from "./base_custom_entity";

export enum Status{
    PLANNED = 'planned',
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    COMPLETED = 'completed',
    CLOSED = 'closed'
}

@Entity("contract_site")
export class ContractSite extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    
    @ManyToOne(() => Contract)
    @JoinColumn({name: "contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "name", type: "varchar", length: 255})
    name!: string

    @Column({name: "site_code", type: "varchar", length: 40})
    siteCode!: string

    @Column({name: "address_line1", type: "varchar", length: 255})
    addressLine1!: string

    @Column({name: "city", type: "varchar", length: 100})
    city!: string

    @Column({name: "state_region", type: "varchar", length: 100})
    stateRegion!: string

    @Column({name: "country_code", type: "char", length: 2})
    countryCode!: string

    @Column({name: "latitude_e6", type: "int"})
    latitudeE6!: number

    @Column({name: "longitude_e6", type: "int"})
    longitudeE6!: number

    @Column({name:"status", type: "enum", enum: Status})
    status!: Status
}