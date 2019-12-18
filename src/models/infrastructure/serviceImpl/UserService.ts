// import { UserRepository } from '../repository/UserRepository';
import { IUserService } from '../../services/interfaces/IUserService';
import { IUserRepository } from '../../domain/interfaces/IUserRepository'
// import { connection } from '../connection/Connection';
import { User } from '../../domain/core/User';
// import { Connection } from 'typeorm';

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  registerUser(user: User) {
    this.userRepository.addUser(user);
  }
}
