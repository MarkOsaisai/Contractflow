import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { ContractParty } from "./contract_party";
import { CompanyUser } from "./company_user";
import { Company } from "./company";
import { BaseCustomEntity } from "./base_custom_entity";

export enum ContractRole{
    CONTRACTOR_PROJECT_LEAD = 'Contractor Project Lead',
    CONTRACTOR_SITE_SUPERVISOR = 'Contractor Site Supervisor',
    CLIENT_PROJECT_MANAGER = 'Client Project Manager',
    CLIENT_SITE_ENGINEER = 'Client Site Engineer',
    HSE_OFFICER = 'HSE Officer',
    HSE_MANAGER = 'HSE Manager',
    FINANCE_OFFICER = 'Finance Officer',
    FINANCE_DIRECTOR = 'Finance Director'
}

@Entity("contract_role_assignment")
export class ContractRoleAssignment extends BaseCustomEntity{

    @Column({name: "contract_party_id", type: "varchar", length: 26})
    contractPartyId!: string
    @ManyToOne(() => ContractParty, {onDelete:"CASCADE"})
    @JoinColumn({name:"contract_party_id", referencedColumnName: "id"})
    contractParty!: ContractParty

    @Column({name: "company_user_id", type: "varchar", length: 26 })
    companyUserId!: string;

    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name:"company_user_id", referencedColumnName: "id"})
    companyUser!: CompanyUser
    
    @Column({name: "company_id", type: "varchar", length: 26})
    companyId!: string

    @ManyToOne(() => Company, {onDelete: "CASCADE"})
    @JoinColumn({name:"company_id", referencedColumnName:"id"})
    company!: Company

    @Column({name: "contract_role", type: "enum", enum: ContractRole})
    role!: ContractRole

    @Column({name: "assigned_at", type: "timestamptz"})
    assignedAt!: Date

    @Column({name: "assigned_by_id", type: "varchar", length: 26})
    assignedById!: string

    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name: "assigned_by_id", referencedColumnName: "id"})
    assignedBy!: CompanyUser

    @Column({name: "revoked_at", type: "timestamptz"})
    revokedAt!: Date

    @Column({name:"revoked_by_id", type: "varchar", length:26})
    revokedById!: string

    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name:"revoked_by_id", referencedColumnName:"id"})
    revokedBy!: CompanyUser

}