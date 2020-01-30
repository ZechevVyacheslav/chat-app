import IUserRequest from '../userModel/IUserRequest';
import { Response } from 'express';

import Role from '../models/domain/core/Role';
import IRoleService from '../models/services/interfaces/IRoleService';
import IUserService from '../models/services/interfaces/IUserService';
import User from '../models/domain/core/User';
import IController from '../Patterns/IController';

export default class AdminController implements IController {
  private roleService: IRoleService;
  private userService: IUserService;

  constructor(roleService: IRoleService, userService: IUserService) {
    this.roleService = roleService;
    this.userService = userService;
  }

  createRole = async (req: IUserRequest, res: Response) => {
    const { title }: { title: string } = req.body;
    const role: Role = new Role();
    role.title = title;

    const createdRole: Role = await this.roleService.addRole(role);
    return res
      .status(201)
      .json({ message: 'Role was created', role: createdRole });
  };

  assignUserRole = async (req: IUserRequest, res: Response) => {
    const userId: number = Number(req.params.userId);
    const user: User = await this.userService.getUserById(userId);
    const userRole: Role = await this.roleService.findRoleByTitle('User');
    await this.roleService.assignRoleToUser(userRole, user);
    const updatedUser: User = await this.userService.getUserById(userId);
    delete updatedUser.password;

    return res
      .status(201)
      .json({ message: 'User role granted', user: updatedUser });
  };

  assignModeratorRole = async (req: IUserRequest, res: Response) => {
    const userId: number = Number(req.params.userId);
    const user: User = await this.userService.getUserById(userId);
    const moderRole: Role = await this.roleService.findRoleByTitle('User');
    await this.roleService.assignRoleToUser(moderRole, user);
    const updatedUser: User = await this.userService.getUserById(userId);
    delete updatedUser.password;

    return res
      .status(201)
      .json({ message: 'Moderator role granted', user: updatedUser });
  };

  assignAdminRole = async (req: IUserRequest, res: Response) => {
    const userId: number = Number(req.params.userId);
    const user: User = await this.userService.getUserById(userId);
    const adminRole: Role = await this.roleService.findRoleByTitle('Admin');
    await this.roleService.assignRoleToUser(adminRole, user);
    const updatedUser: User = await this.userService.getUserById(userId);
    delete updatedUser.password;

    return res
      .status(201)
      .json({ message: 'Admin role granted', user: updatedUser });
  };
}
