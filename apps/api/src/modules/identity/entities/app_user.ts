// @ts-ignore - TypeORM is expected to be installed in the project dependencies.
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { BaseCustomEntity } from "./base_custom_entity"


export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

@Entity("app_user")
export class User extends BaseCustomEntity{

    @Column({name: "email", type:"citext", unique:true})
    email!: string

    @Column({ name: "first_name", type: "varchar", length: 100})
    firstName!: string

    @Column({ name: "last_name", type: "varchar", length: 100})
    lastName!: string

    @Column({ name: "middle_name", type:"varchar", length: 100 })
    middleName!: string

    @Column({ name: "phone_number", type:"varchar", length: 20})
    phoneNumber!: string

    @Column({ name: "password_hash", type: "varchar", length: 255, select: false})
    passwordHash!: string

    @Column({name: "status",
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE})
    status!: UserStatus

    @Column({name: "is_platform_admin", type: "boolean"})
    isPlatformAdmin!: boolean

    @Column({name: "mfa_enabled", type: "boolean"})
    mfaEnabled!: boolean

    @Column({name: "timezone", type: "varchar", length: 64})
    timezone!: string

    @Column({ name: "email_verified_at", type: "timestamptz"})
    emailVerifiedAt!: Date

    @Column({ name: "last_login_at", type: "timestamptz"})
    lastLoginAt!: Date


}
