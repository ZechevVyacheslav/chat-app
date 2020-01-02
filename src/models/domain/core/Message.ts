import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import Room from './Room';
import { User } from './User';

@Entity('message')
export default class Message {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(
    type => Room,
    room => room.messages
  )
  public room: Room;

  @ManyToOne(
    type => User,
    user => user.messages
  )
  public user: User;

  @Column()
  public text: string;
}
