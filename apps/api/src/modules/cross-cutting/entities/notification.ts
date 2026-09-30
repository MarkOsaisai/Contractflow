import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./app_user";
import { Contract } from "./contract";
import { BaseCustomEntity } from "./base_custom_entity";


export enum NotificationChannel {
    PUSH = "push",
    SMS = "sms",
    EMAIL = "email"
}
export enum NotificationStatus{
    SENT = "sent",
    DELIVERED = "delivered",
    PENDING = "pending",
    FAILED = "failed",
    READ = "read"
}


@Entity("notification")
export class Notification extends BaseCustomEntity{

    @Column({name: "recipient_user_id", type: "varchar", length: 26})
    recipientUserId!: string

    @ManyToOne (() => User, {onDelete: "CASCADE"})
    @JoinColumn ({name: "user_id", referencedColumnName: "id"})
    user!: User

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string

    @ManyToOne (() => Contract, {onDelete: "CASCADE"})
    @JoinColumn ({name: "contract_id", referencedColumnName: "id"})
    contract! : Contract

    @Column({name: "notification_type", type:"varchar", length: 100})
    notificationType!: string

    @Column({name: "title", type: "varchar", length: 255})
    title!: string

    @Column({name: "body", type: "text"})
    body!: string

    @Column({name: "entity_type", type: "varchar", length: 60 })
    entityType!: string

    @Column({name: "entity_id",type: "uuid"})
    entityId!: string

    @Column({name: "channel", type: "enum", enum: NotificationChannel})
    channel!: NotificationChannel
    
    @Column({name: "status", type: "enum", enum: NotificationStatus, default: NotificationStatus.PENDING})
    status!: NotificationStatus

    @Column({name: "sent_at", type:"timestamptz"})
    sentAt!: Date

    @Column({name: "read_at", type: "timestamptz"})
    readAt!: Date



}