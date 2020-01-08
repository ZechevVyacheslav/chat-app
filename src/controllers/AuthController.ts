import * as express from 'express';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';
import RoleService from '../models/infrastructure/serviceImpl/RoleService';
import { User } from '../models/domain/core/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Role from '../models/domain/core/Role';

export class AuthController {
  private userService: UserService;
  private roleService: RoleService;

  constructor(userService: UserService, roleService: RoleService) {
    this.userService = userService;
    this.roleService = roleService;
  }

  register = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;
    const role: Role = await this.roleService.findRoleByTitle('User');
    const existingUserWithEmail = await this.userService.getUserByEmail(email);
    const existingUserWithUserName = await this.userService.getUserByUsername(
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

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        roleTitle: role.title
      },
      'supersecretprivatkey',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User created!',
      user: {
        userId: user.id,
        email: user.email,
        username: user.username
      },
      token
    });
  };

  login = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user: User = await this.userService.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Wrong username!' });
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(401).json({ message: 'Wrong password!' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        roleTitle: user.role.title
      },
      'supersecretprivatkey',
      { expiresIn: '1h' }
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
