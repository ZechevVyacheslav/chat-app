import * as express from 'express';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';
import { User } from 'models/domain/core/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export class AuthController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;
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
      password
    );

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, username: user.username },
      'supersecretprivatkey',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User created!',
      user: {
        userId: user.user_id,
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

    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Wrong username!' });
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(401).json({ message: 'Wrong password!' });
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, username: user.username },
      'supersecretprivatkey',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'User autherised!',
      user: {
        userId: user.user_id,
        email: user.email,
        username: user.username
      },
      token
    });
  };
}
