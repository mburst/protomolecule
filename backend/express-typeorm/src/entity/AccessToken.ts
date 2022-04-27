import {
  BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
@Index(['user.id', 'expiresAt'])
export class AccessToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
    expiresAt!: Date;

  @ManyToOne(() => User, (user) => user.id)
    user!: User;
}
