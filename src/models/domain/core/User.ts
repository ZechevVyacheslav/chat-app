import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import Message from './Message';
import Role from './Role';

@Entity('user')
export default class User {
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

  @ManyToOne(
    type => Role,
    role => role.users
  )
  role: Role;
}
