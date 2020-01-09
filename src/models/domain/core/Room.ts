import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import User from './User';
import Message from './Message';

@Entity('room')
export default class Room {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public creatorId: number;

  @ManyToMany(type => User)
  @JoinTable()
  public members: User[];

  @OneToMany(
    type => Message,
    message => message.room
  )
  messages: Message[];
}
