import{Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn} from "typeorm";  
import { Contract } from "./contract";
import { ContractSite } from "./contract_site";
import { ContractParty } from "./contract_party";
import { BaseCustomEntity } from "./base_custom_entity";

@Entity("inventory_item")
export class InventoryItem extends BaseCustomEntity{

    @Column({name: "contract_id", type: "varchar", length: 26})
    contractId!: string
    @ManyToOne(() => Contract, {onDelete:"CASCADE"} )
    @JoinColumn({name: "contract_id", referencedColumnName: "id"})
    contract!: Contract

    @Column({name: "contract_site_id", type: "varchar", length: 26})
    contractSiteId!: string
    @ManyToOne(() => ContractSite, {onDelete:"CASCADE"})
    @JoinColumn({name:"contract_site_id", referencedColumnName: "id"})
    contractSite!: ContractSite      

    @Column({name: "contract_party_id", type: "varchar", length: 26})
    contractPartyId!: string
    @ManyToOne(() => ContractParty)
    @JoinColumn({name:"contract_party_id", referencedColumnName:"id"})
    contractParty!: ContractParty

    @Column({name: "item_code", type:"varchar", length:60})
    itemCode!: string

    @Column({name: "name", type:"varchar", length:255})
    name!: string

    @Column({name: "category", type:"varchar", length:100})
    category!: string

    @Column({name: "unit_of_measure", type:"varchar", length:20})
    unitOfMeasure!: string

    @Column({name: "quantity_on_hand_milli", type:"bigint"})
    quantityOnHandMilli!: number

    @Column({name: "reorder_level_milli", type:"bigint"})
    reorderLevelMilli!: number
}