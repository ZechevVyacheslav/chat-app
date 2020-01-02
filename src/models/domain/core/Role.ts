import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { User } from './User';

@Entity('role')
export default class Role {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @ManyToOne(type => User)
  public users: User[];
}
