import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Company } from "./company";
import { User } from "./app_user";
import { BaseCustomEntity } from "./base_custom_entity";


export enum CompanyRole{
    CONTRACTOR_PROJECT_LEAD = 'Contractor Project Lead',
    CONTRACTOR_SITE_SUPERVISOR = 'Contractor Site Supervisor',
    CLIENT_PROJECT_MANAGER = 'Client Project Manager',
    CLIENT_SITE_ENGINEER = 'Client Site Engineer',
    HSE_OFFICER = 'HSE Officer',
    HSE_MANAGER = 'HSE Manager',
    FINANCE_OFFICER = 'Finance Officer',
    FINANCE_DIRECTOR = 'Finance Director'
}
export enum CompanyUserStatus{
    ACTIVE = "active",
    INACTIVE = "inactive"
}

@Entity("company_user")
export class CompanyUser extends BaseCustomEntity{
 
    @Column({name: "company_id", type: "varchar", length: 26})
    companyId!: string
    
    @ManyToOne(() => Company, {onDelete:"CASCADE"})
    @JoinColumn({name: "company_id", referencedColumnName: "id"})
    company!: Company

    @Column({name: "user_id", type: "varchar", length: 26})
    userId!: string

    @ManyToOne(() => User, {onDelete: "CASCADE"})
    @JoinColumn({name: "user_id", referencedColumnName: "id"})
    user!: User

    @Column({name: "company_role", type: "enum", enum: CompanyRole})
    companyRole!: CompanyRole

    @Column({name: "job_title", type: "varchar", length: 150})
    jobTitle!: string

    @Column({name: "status", type: "enum", enum: CompanyUserStatus})
    status!: CompanyUserStatus

    @Column({name: "joined_at", type: "timestamptz"})
    joinedAt!: Date

    @Column({name: "left_at", type: "timestamptz"})
    leftAt!: Date
}