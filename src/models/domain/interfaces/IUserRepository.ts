import { User } from '../core/User';

export interface IUserRepository {
    findUserById(id: number): User;
    findUserByUsername(username: string): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    addUser(user: User): void;
}