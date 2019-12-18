import { User } from '../../domain/core/User';

export interface IUserService {
    registerUser(user: User): void;
}