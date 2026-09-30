import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Contract } from '../../contract/entities/contract';
import { CompanyUser } from '../../identity/entities/company_user';
import { BaseCustomEntity } from './base_custom_entity';

export enum EntityType {
  CONTRACT = 'contract',
  DOCUMENT = 'document',
  COMMENT = 'comment',
  OTHER = 'other',
}
export enum CommentVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

@Entity('comment')
export class Comment extends BaseCustomEntity {
  @Column({ name: 'contract_id', type: 'varchar', length: 26 })
  contractId!: string;
  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  contract!: Contract;

  @Column({ name: 'author_company_user_id', type: 'varchar', length: 26 })
  authorCompanyUserId!: string;
  @ManyToOne(() => CompanyUser)
  @JoinColumn({ name: 'author_company_user_id', referencedColumnName: 'id' })
  companyUser!: CompanyUser;

  @Column({ name: 'parent_comment_id', type: 'varchar', length: 26 })
  parentCommentId!: string;
  @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_comment_id', referencedColumnName: 'id' })
  comment!: Comment;

  @Column({ name: 'entity_type', type: 'enum', enum: EntityType })
  entityType!: EntityType;

  @Column({ name: 'entity_id', type: 'uuid' })
  entityId!: string;

  @Column({ name: 'body', type: 'varchar' })
  body!: string;

  @Column({ name: 'visibility', type: 'enum', enum: CommentVisibility })
  visibility!: CommentVisibility;
}
