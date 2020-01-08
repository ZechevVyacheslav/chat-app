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

  findRoleByTitle(title: string) {
    return this.findOne({where: {title}});
  }

  assignRoleToUser(role: Role, user: User) {
    return this.findOne(role.id, {relations: ['users']}).then(role => {
      role.users = [...role.users, user];
      return this.save(role);
    })
  }
}
