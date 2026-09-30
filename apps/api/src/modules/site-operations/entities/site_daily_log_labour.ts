import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { SiteDailyLog } from "./site_daily_log";
import { BaseCustomEntity } from "./base_custom_entity";


@Entity("site_daily_log_labour")
export class SiteDailyLogLabour extends BaseCustomEntity{

    @Column({name: "site_daily_log_id", type: "varchar", length: 26})
    siteDailyLogId!: string
    @ManyToOne(() => SiteDailyLog)
    @JoinColumn({name: "site_daily_log_id", referencedColumnName: "id"})
    siteDailyLog!: SiteDailyLog

    @Column({name: "trade", type: "varchar", length: 100})
    trade!: string

    @Column({name: "worker_count", type: "int"})
    workerCount!: number

    @Column({name: "minutes_worked", type: "int"})
    minutesWorked!: number

    @Column({name: "remarks", type: "text"})
    remarks!: string
}