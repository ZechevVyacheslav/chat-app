import Role from '../../domain/core/Role';
import IRoleRepository from '../../domain/interfaces/IRoleRepository';
import IRoleService from '../../services/interfaces/IRoleService';
import { User } from '../../domain/core/User';

export default class RoleService implements IRoleService {
  private roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }

  addRole(role: Role) {
    return this.roleRepository.addRole(role);
  }

  assignRoleToUser(role: Role, user: User) {
    return this.roleRepository.assignRoleToUser(role, user);
  }
}
