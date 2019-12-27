import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { User } from './User'

@Entity('room')
export default class Room {
  @PrimaryGeneratedColumn()
  public room_id: number;

  @Column()
  public title: string;

  @Column()
  public creatorId: number;

  @ManyToMany(type => User)
  @JoinTable()
  public members: User[];
}