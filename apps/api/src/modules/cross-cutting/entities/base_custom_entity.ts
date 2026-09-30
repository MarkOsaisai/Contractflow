import { 
    CreateDateColumn, 
    UpdateDateColumn, 
    PrimaryGeneratedColumn, 
    BeforeInsert} from "typeorm";
import { ulid } from ulid

export abstract class BaseCustomEntity {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string;

    @CreateDateColumn({ 
        name: "created_at", 
        type: "timestamptz", 
        default: () => "now()", })
    createdAt!: Date;

    @UpdateDateColumn({ 
        name: "updated_at", 
        type: "timestamptz", 
        default: () => "now()", })
    updatedAt!: Date;

    @BeforeInsert()
    generatedId() {
        if (!this.id){
            this.id = ulid()
        }
    }
}