import { User } from '../../domain/core/User';
import Role from 'models/domain/core/Role';

export interface IUserService {
  registerUser(email: string, username: string, password: string, role: Role): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: number): Promise<User>;
}
