import { User } from '../core/User';

export interface IUserRepository {
    findUserById(id: number): User;
    findUserByName(name: string): User;
    findUserByEmail(email: string): User;
    addUser(user: User): void;
}