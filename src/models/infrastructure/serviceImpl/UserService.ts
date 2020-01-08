import { IUserService } from '../../services/interfaces/IUserService';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/core/User';
import * as bcrypt from 'bcryptjs';
import Role from 'models/domain/core/Role';

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  registerUser(email: string, username: string, password: string, role: Role) {
    return bcrypt.hash(password, 12).then(hashedPassword => {
      const user = new User();
      user.email = email;
      user.username = username;
      user.password = hashedPassword;
      user.role = role;
      return this.userRepository.addUser(user);
    });
  }

  getUserByUsername(username: string) {
    return this.userRepository.findUserByUsername(username);
  }

  getUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  getUserById(id: number) {
    return this.userRepository.findUserById(id);
  }
}
