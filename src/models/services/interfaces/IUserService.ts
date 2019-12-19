import { User } from '../../domain/core/User';

export interface IUserService {
  registerUser(email: string, username: string, password: string): void;
}
