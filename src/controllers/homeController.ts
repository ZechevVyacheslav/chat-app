import * as express from 'express';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';
import { User } from '../models/domain/core/User';

export class HomeController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getIndexPage = (req: express.Request, res: express.Response) => {
    res.render('index', {
      message: 'Hello on the index page'
    });
  };

  register = (req: express.Request, res: express.Response) => {
    const user: User = new User();
    user.email = 'dummy@gmail.com';
    user.password = 'passme';
    user.username = 'Dummy';

    this.userService.registerUser(user);
    res.render('index', {
      message: 'Saving....'
    });
  };
}
