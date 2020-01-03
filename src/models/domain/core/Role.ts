import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { User } from './User';

@Entity('role')
export default class Role {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @OneToMany(
    type => User,
    user => user.role
  )
  public users: User[];
}
