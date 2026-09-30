import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Contract } from "./contract";
import { Company } from "./company";
import { BaseCustomEntity } from "./base_custom_entity";

export enum DocumentCategory {
    CERTIFICATE="certificate",  
    HSE="HSE",
    CONTRACT="contract",
    INVOICE="invoice",
    REPORT="report",
    OTHER="other"
}
export enum DocumentVisibility{
    PUBLIC="public",
    PRIVATE="private"
}
export enum DocumentStatus{
    VALID="Valid", 
    EXPIRING="Expiring", 
    EXPIRED="Expired",
    VERIFICATION_PENDING="Verification Pending", 
    VERIFIED="Verified", 
    REJECTED="Rejected",
}

@Entity("document")
export class Document extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    @ManyToOne(() => Contract, {onDelete:"CASCADE"})
    @JoinColumn({name:"contract_id", referencedColumnName:"id"})
    contract!: Contract

    @Column({name: "owner_company_id", type: "varchar", length: 26})
    ownerCompanyId!: string
    @ManyToOne(() => Company, {onDelete:"CASCADE"})
    @JoinColumn({name:"owner_company_id", referencedColumnName:"id"})
    Company!: Company

    @Column({name: "title", type:"varchar", length:255})
    title!: string

    @Column({name: "document_number", type:"varchar", length:60})
    documentNumber!: string

    @Column({name: "category", type:"enum", enum: DocumentCategory})
    category!: DocumentCategory

    @Column({name: "visibility", type:"enum", enum: DocumentVisibility})
    visibility!: DocumentVisibility

    @Column({name: "status", type:"enum", enum: DocumentStatus})
    status!: DocumentStatus
}