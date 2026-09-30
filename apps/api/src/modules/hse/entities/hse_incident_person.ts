import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne} from "typeorm";
import { HseIncident } from "./hse_incident";
import { CompanyUser } from "./company_user";
import { BaseCustomEntity } from "./base_custom_entity";

export enum HseIncidentPersonInvolvement{
    VICTIM = 'victim',
    INJURED_PERSON = 'injured_person',
    WITNESS = 'witness',
    REPORTER = 'reporter',
    SUPERVISOR = 'supervisor',
    FIRST_AIDER = 'first_aider',
    EMERGENCY_RESPONDER = 'emergency_responder',
    INVESTIGATOR = 'investigator',
    CONTRACTOR = 'contractor',
    VISITOR = 'visitor',
    OTHER = 'other'
}


@Entity("hse_incident_person")
export class HseIncidentPerson extends BaseCustomEntity{

    @Column({name: "hse_incident_id", type: "varchar", length: 26})
    hseIncidentId!: string
    @OneToOne(() => HseIncident, {onDelete:"CASCADE"})
    @JoinColumn({name:"hse_incident_id"})
    hseIncident!: HseIncident

    @Column({name: "company_user_id", type: "varchar", length: 26})
    companyUserId!: string
    @ManyToOne(() => CompanyUser, {onDelete:"CASCADE"})
    @JoinColumn({name:"company_user_id", referencedColumnName: "id"})
    companyUser!: CompanyUser

    @Column({name: "first_name", type: "varchar", length: 100})
    firstName!: string  

    @Column({name: "last_name", type: "varchar", length: 100})
    lastName!: string 

    @Column({name: "involvement", type:"enum", enum:HseIncidentPersonInvolvement})
    involvement!: HseIncidentPersonInvolvement

    @Column({name: "employer_name", type: "varchar", length: 255})
    employerName!: string 

    @Column({name: "job_title", type: "varchar", length: 150})
    jobTitle!: string
    
    @Column({name: "phone_number", type: "varchar", length: 20})
    phoneNumber!: string 

    @Column({name: "injury_description", type:"text"})
    injuryDescription!: string

    @Column({name: "body_part_affected", type: "varchar", length: 100})
    bodyPartAffected!: string 

    @Column({name: "treatment_given", type:"text"})
    treatment_given!: string

    @Column({name: "statement", type:"text"})
    statement!: string
}