import { Request, Response } from 'express';
import IUserRequest from '../userModel/IUserRequest';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import IUserService from '../models/services/interfaces/IUserService';
import IRoleService from '../models/services/interfaces/IRoleService';
import User from '../models/domain/core/User';
import Role from '../models/domain/core/Role';
import IController from '../Patterns/IController';

export default class AuthController implements IController {
  private userService: IUserService;
  private roleService: IRoleService;

  constructor(userService: IUserService, roleService: IRoleService) {
    this.userService = userService;
    this.roleService = roleService;
  }

  register = async (req: IUserRequest, res: Response) => {
    const {
      email,
      username,
      password
    }: { email: string; username: string; password: string } = req.body;
    const role: Role = await this.roleService.findRoleByTitle('User');
    console.log(role);
    const existingUserWithEmail: User = await this.userService.getUserByEmail(
      email
    );
    const existingUserWithUserName: User = await this.userService.getUserByUsername(
      username
    );

    if (existingUserWithEmail || existingUserWithUserName) {
      return res
        .status(409)
        .json({ message: 'Email or username were already taken' });
    }

    const user: User = await this.userService.registerUser(
      email,
      username,
      password,
      role
    );

    console.log(user);

    const token: string = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        roleTitle: role.title
      },
      'supersecretprivatkey',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created!',
      user: {
        userId: user.id,
        email: user.email,
        username: user.username,
        role: role.title
      },
      token
    });
  };

  login = async (req: IUserRequest, res: Response) => {
    const {
      username,
      password
    }: { username: string; password: string } = req.body;

    const user: User = await this.userService.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Wrong username!' });
    }

    const isEqual: boolean = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(401).json({ message: 'Wrong password!' });
    }

    console.log(user);

    const token: string = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        roleTitle: user.role.title
      },
      'supersecretprivatkey',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'User autherised!',
      user: {
        userId: user.id,
        email: user.email,
        username: user.username,
        roleTitle: user.role.title
      },
      token
    });
  };
}
