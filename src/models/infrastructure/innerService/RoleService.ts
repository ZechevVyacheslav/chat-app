import IRoleRepository from '../../domain/interfaces/IRoleRepository';
import IRoleService from '../../services/interfaces/IRoleService';
import Role from '../../domain/core/Role';
import User from '../../domain/core/User';

import BaseService from './BaseService';

import AddRoleStrategy from './strategies/create/AddRoleStrategy';
import FindRoleByTitleStrategy from './strategies/read/FindRoleByTitleStrategy';
import AddRoleToUserStrategy from './strategies/create/AddRoleToUserStrategy';

export default class RoleService extends BaseService implements IRoleService {
  private roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    super();
    this.roleRepository = roleRepository;
  }

  addRole(role: Role) {
    this.invoker.changeAddingStragegy(new AddRoleStrategy(this.roleRepository));
    return this.addingStrategy.add(role);
  }

  findRoleByTitle(title: string) {
    this.invoker.changeSearchingStrategy(
      new FindRoleByTitleStrategy(this.roleRepository)
    );
    return this.searchingStrategy.find(title);
  }

  assignRoleToUser(role: Role, user: User) {
    this.invoker.changeAddingStragegy(
      new AddRoleToUserStrategy(this.roleRepository)
    );
    return this.addingStrategy.add({ role, user });
  }
}
