import { IUserService } from '../../services/interfaces/IUserService';
import { IUserRepository } from '../../domain/interfaces/IUserRepository'
import { User } from '../../domain/core/User';

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  registerUser(email, username, password) {
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    this.userRepository.addUser(user);
  }

  getUserByUsername(username: string) {
    return this.userRepository.findUserByUsername(username);
  }
}
