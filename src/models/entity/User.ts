import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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