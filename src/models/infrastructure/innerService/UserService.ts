import IUserService from '../../services/interfaces/IUserService';
import IUserRepository from '../../domain/interfaces/IUserRepository';
import User from '../../domain/core/User';
import Role from 'models/domain/core/Role';
import * as bcrypt from 'bcryptjs';

import BaseService from './BaseService';

import AddUserStrategy from './strategies/create/AddUserStrategy';
import FindUserByUsernameStrategy from './strategies/read/FindUserByUsernameStrategy';
import FindUserByEmailStrategy from './strategies/read/FindUserByEmailStrategy';
import FindUserByIdStrategy from './strategies/read/FindUserByIdStrategy';

export default class UserService extends BaseService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }

  registerUser(email: string, username: string, password: string, role: Role) {
    return bcrypt.hash(password, 12).then(hashedPassword => {
      const user = new User();
      user.email = email;
      user.username = username;
      user.password = hashedPassword;
      user.role = role;
      this.invoker.changeAddingStragegy(
        new AddUserStrategy(this.userRepository)
      );
      return this.addingStrategy.add(user);
    });
  }

  getUserByUsername(username: string) {
    this.invoker.changeSearchingStrategy(
      new FindUserByUsernameStrategy(this.userRepository)
    );
    return this.searchingStrategy.find(username);
  }

  getUserByEmail(email: string) {
    this.invoker.changeSearchingStrategy(
      new FindUserByEmailStrategy(this.userRepository)
    );
    return this.searchingStrategy.find(email);
  }

  getUserById(id: number) {
    this.invoker.changeSearchingStrategy(
      new FindUserByIdStrategy(this.userRepository)
    );
    return this.searchingStrategy.find(id);
  }
}
