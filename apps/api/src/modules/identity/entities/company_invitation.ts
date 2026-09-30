import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Company } from "./company";
import { CompanyUser } from "./company_user";  
import { BaseCustomEntity } from "./base_custom_entity";

export enum InvitationRole{
    CONTRACTOR_PROJECT_LEAD = 'Contractor Project Lead',
    CONTRACTOR_SITE_SUPERVISOR = 'Contractor Site Supervisor',
    CLIENT_PROJECT_MANAGER = 'Client Project Manager',
    CLIENT_SITE_ENGINEER = 'Client Site Engineer',
    HSE_OFFICER = 'HSE Officer',
    HSE_MANAGER = 'HSE Manager',
    FINANCE_OFFICER = 'Finance Officer',
    FINANCE_DIRECTOR = 'Finance Director'
}

export enum InvitationStatus{
    PENDING = "pending",
    ACCEPTED = "accepted",
    DECLINED = "declined"
}

@Entity("company_invitation")
export class CompanyInvitation extends BaseCustomEntity{

    @Column({name: "company_id", type: "varchar", length: 26})
    companyId!: string
    @ManyToOne(() => Company, {onDelete:"CASCADE"})
    @JoinColumn({name:"company_id", referencedColumnName:"id"})
    company!: Company

    @Column({name: "invited_by_company_user_id", type: "varchar", length: 26})
    invitedByCompanyUserId!: string
    @ManyToOne(() => CompanyUser)
    @JoinColumn({name:"invited_by_company_user_id", referencedColumnName:"id"})
    CompanyUser!: CompanyUser

    @Column({name: "email", type:"citext"})
    email!: string

    @Column({name: "first_name", type:"varchar", length: 100})
    firstName!: string

    @Column({name: "last_name", type:"varchar", length: 100})
    lastName!: string

    @Column({name: "company_role", type:"enum", enum: InvitationRole})
    companyRole!: InvitationRole

    @Column({name: "token_hash", type:"varchar", length: 255, unique: true})
    tokenHash!: string

    @Column({name: "status", type:"enum", enum: InvitationStatus, default: InvitationStatus.PENDING})
    status!: InvitationStatus

    @Column({name: "expires_at", type:"timestamptz"})
    expiresAt!: Date

    @Column({name: "accepted_at", type: "timestamptz"})
    acceptedAt!: Date

}