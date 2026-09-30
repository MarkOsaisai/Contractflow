import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { SiteDailyLog } from "./site_daily_log";
import { BaseCustomEntity } from "./base_custom_entity";


export enum EquipmentCondition{
    EXCELLENT = 'excellent',
    GOOD = 'good',
    FAIR = 'fair',
    POOR = 'poor',
    DAMAGED = 'damaged',
    REPAIR_REQUIRED = 'repair_required',
    OUT_OF_SERVICE = 'out_of_service',
    IDLE = 'idle',
    OPERATING = 'operating',
    STANDBY = 'standby'
}

@Entity("site_daily_log_equipment")
export class SiteDailyLogEquipment extends BaseCustomEntity{

    @Column({name: "site_daily_log_id", type: "varchar", length: 26})
    siteDailyLogId!: string
    @ManyToOne(() => SiteDailyLog)
    @JoinColumn({name: "site_daily_log_id", referencedColumnName: "id"})
    siteDailyLog!: SiteDailyLog

    @Column({name: "equipment_name", type: "varchar", length: 150})
    equipmentName!: string

    @Column({name: "equipment_tag", type: "varchar", length: 60})
    equipmentTag!: string

    @Column({name: "quantity", type: "int"})
    quantity!: number

    @Column({name: "minutes_operated", type: "int"})
    minutesOperated!: number

    @Column({name: "minutes_idle", type: "int"})
    minutesIdle!: number

    @Column({name: "condition", type: "enum", enum: EquipmentCondition})
    condition!: EquipmentCondition

    @Column({name: "remarks", type: "text"})
    remarks!: string
}