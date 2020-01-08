import Role from '../../domain/core/Role';
import { User } from '../../domain/core/User';

export default interface IRoleService {
    addRole(role: Role): Promise<Role>;
    findRoleByTitle(title: string): Promise<Role>;
    assignRoleToUser(role: Role, user: User): Promise<Role>;
}