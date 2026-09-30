import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Document} from "./document";
import { BaseCustomEntity } from "./base_custom_entity";


@Entity("document_version")
export class DocumentVersion extends BaseCustomEntity{

    @Column({name: "document_id", type: "varchar", length: 26})
    documentId!: string
    @ManyToOne(() => Document, {onDelete:"NO ACTION"})
    @JoinColumn({name:"document_id", referencedColumnName: "id"})
    document!: Document

    @Column({name: "version_number", type:"int"})
    versionNumber!: number

    @Column({name: "storage_key", type:"varchar", length:512})
    storageKey!: string

    @Column({name: "file_name", type:"varchar", length:255})
    fileName!: string

    @Column({name: "mime_type", type:"varchar", length:127})
    mimeType!: string

    @Column({name: "size_bytes", type:"bigint"})
    sizeBytes!: bigint

    @Column({name: "checksum_sha256", type:"char", length:64})
    checksumSha256!: string

    @Column({name: "change_note", type:"text"})
    changeNote!: string

    @Column({name: "uploaded_by_id", type: "varchar", length: 26})
    uploadedById!: string
    @ManyToOne(() => Document, {onDelete:"NO ACTION"})
    @JoinColumn({name:"uploaded_by_id", referencedColumnName: "owner_company_id"})
    uploadedBy!: Document

    @Column({name: "uploaded_at", type:"timestamptz"})
    uploadedAt!: Date

}