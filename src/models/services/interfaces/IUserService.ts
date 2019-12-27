import { User } from '../../domain/core/User';

export interface IUserService {
  registerUser(email: string, username: string, password: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>
}
