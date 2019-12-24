import * as express from 'express';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';
import { User } from 'models/domain/core/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
interface IUserRequest extends express.Request {
  userId: number
}

export class HomeController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register = async (req: express.Request, res: express.Response) => {
    const { email, username, password } = req.body;

    if ((email || '').length < 1) {
      return res
        .status(400)
        .json({ message: 'E-mail too short or not included' });
    }

    if ((username || '').length < 1) {
      return res
        .status(400)
        .json({ message: 'Username too short or not included' });
    }

    if ((password || '').length < 1) {
      return res
        .status(400)
        .json({ message: 'Password too short or not included' });
    }

    const user: User = await this.userService.registerUser(
      email,
      username,
      password
    );

    res.status(201).json({ message: 'User created!', userId: user.user_id });
  };

  login = async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;

    if ((username || '').length < 1) {
      return res
        .status(400)
        .json({ message: 'Username too short or not included' });
    }

    if ((password || '').length < 1) {
      return res
        .status(400)
        .json({ message: 'Password too short or not included' });
    }

    const user = await this.userService.getUserByUsername(username);
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(401).json({ message: 'Wrong password!' });
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, username: user.username },
      'supersecretprivatkey',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, userId: user.user_id });
  };

  getRoomsPage = (req: IUserRequest, res: express.Response) => {
    console.log(req.userId);
    res.status(200).json({ message: 'Got all rooms' });
  };
}
