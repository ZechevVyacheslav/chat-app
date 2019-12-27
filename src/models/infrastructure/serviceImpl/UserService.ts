import { IUserService } from '../../services/interfaces/IUserService';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/core/User';
import * as bcrypt from 'bcryptjs';

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  registerUser(email: string, username: string, password: string) {
    return bcrypt.hash(password, 12).then(hashedPassword => {
      const user = new User();
      user.email = email;
      user.username = username;
      user.password = hashedPassword;
      return this.userRepository.addUser(user);
    });
  }

  getUserByUsername(username: string) {
    return this.userRepository.findUserByUsername(username);
  }

  getUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }
  
}
