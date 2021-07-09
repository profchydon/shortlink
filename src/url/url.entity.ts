import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Url extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  @Column()
  encodedUrl: string;

  @Column()
  urlCode: string;

  @Column({ nullable: true })
  last_visited: string;

  @Column({ default: 0 })
  clickCount: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
