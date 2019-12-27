import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  public user_id: number;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column()
  public email: string;
}
