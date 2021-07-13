import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Url extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  url: string;

  @Column()
  encodedUrl: string;

  @Column({ unique: true })
  urlCode: string;

  @Column({ nullable: true })
  lastVisited: Date;

  @Column({ default: 0 })
  clickCount: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
