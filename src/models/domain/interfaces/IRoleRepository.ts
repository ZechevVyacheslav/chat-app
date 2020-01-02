import Role from '../core/Role';
import { User } from '../core/User';

export default interface IRoleRepository {
  addRole(role: Role): Promise<Role>;
  assignUser(role: Role, user: User): Promise<Role>;
  deassignUser(role: Role, user: User): Promise<Role>;
}
