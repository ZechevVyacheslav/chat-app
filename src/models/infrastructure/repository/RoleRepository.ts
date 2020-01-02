import { EntityRepository, Repository } from 'typeorm';
import IRoleRepository from '../../domain/interfaces/IRoleRepository';
import Role from '../../domain/core/Role';
import { User } from '../../domain/core/User';

@EntityRepository(Role)
export default class RoleRepository extends Repository<Role>
  implements IRoleRepository {
  addRole(role: Role) {
    return this.save(role);
  }

  assignUser(role: Role, user: User) {
    return this.find({ where: { id: role.id }, relations: ['users'] }).then(
      roles => {
        const role: Role = roles[0];
        role.users = [...role.users, user];
        return this.save(role);
      }
    );
  }

  deassignUser(role: Role, user: User) {
    return this.find({ where: { id: role.id }, relations: ['users'] }).then(
        roles => {
          const role: Role = roles[0];
          role.users = role.users.filter(dbUser => dbUser.id !== user.id);
          return this.save(role);
        }
      );
  }
}
