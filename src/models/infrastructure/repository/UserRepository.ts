import { EntityRepository, AbstractRepository, Repository } from 'typeorm';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/core/User';

@EntityRepository(User)
export class UserRepository extends Repository<User>
  implements IUserRepository {
  findUserByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  findUserById() {
    return new User(); // TODO
  }

  findUserByUsername(username: string) {
    return this.findOne({ where: { username } }).then(result => {
      console.log(result);
      return result;
    });
  }

  addUser(user: User) {
    return this.save(user).then(result => {
      console.log(result);
      return result;
    });
  }
}
