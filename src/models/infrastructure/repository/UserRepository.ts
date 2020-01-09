import { EntityRepository, Repository } from 'typeorm';
import IUserRepository from '../../domain/interfaces/IUserRepository';
import User from '../../domain/core/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User>
  implements IUserRepository {
  findUserByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  findUserById(id: number) {
    return this.findOne(id, { relations: ['role'] });
  }

  findUserByUsername(username: string) {
    return this.findOne({ where: { username }, relations: ['role'] }).then(
      result => {
        // console.log(result);
        return result;
      }
    );
  }

  addUser(user: User) {
    return this.save(user).then(result => {
      // console.log(result);
      return result;
    });
  }
}
