import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Message from './Message';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @OneToMany(
    type => Message,
    message => message.user
  )
  messages: Message[];
}
