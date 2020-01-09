import Role from '../core/Role';
import User from '../core/User';

export default interface IRoleRepository {
  addRole(role: Role): Promise<Role>;
  findRoleByTitle(title: string): Promise<Role>;
  assignRoleToUser(role: Role, user: User): Promise<Role>;
}
