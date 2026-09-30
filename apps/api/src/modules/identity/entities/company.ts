import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseCustomEntity } from "./base_custom_entity";

export enum CompanyStatus{
    ACTIVE = "active",
    INACTIVE = "inactive"
}

@Entity("company")
export class Company extends BaseCustomEntity{

    @Column({name: "name", type:"varchar", length:255})
    name!: string
    
    @Column({name: "legal_name", type:"varchar", length:255})
    legalName!: string

    @Column({name: "registration_number", type:"varchar", length:64})
    registrationNumber!: string

    @Column({name: "tax_identification_number", type: "varchar", length:64})
    taxIdentificationNumber!: string

    @Column({name: "email", type: "citext"})
    email!: string

    @Column({name: "phone_number", type: "varchar", length:20})
    phoneNumber!: string

    @Column({name: "website", type: "varchar", length:255})
    website!: string

    @Column({name: "address_line1", type: "varchar", length:255})
    addressLine1!: string

    @Column({name: "address_line2", type: "varchar", length:255})
    addressLine2!: string

    @Column({name: "city", type: "varchar", length:100})
    city!: string

    @Column({name: "state_region", type: "varchar", length:100})
    stateRegion!: string

    @Column({name: "postal_code", type: "varchar", length:20})
    postalCode!: string
 
    @Column({name: "country_code", type: "char", length:2})
    countryCode!: string

    @Column({name: "default_currency_code", type: "char", length:3})
    defaultCurrencyCode!: string

    @Column({name: "status", type:"enum", enum: CompanyStatus})
    status!: CompanyStatus

    @Column({name: "verified_at", type: "timestamptz"})
    verifiedAt!: Date

}