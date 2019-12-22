import * as express from 'express';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';

export class HomeController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getIndexPage = (req: express.Request, res: express.Response) => {
    res.status(200); // 200 || 304
    res.render('index', {
      message: 'Hello on the index page'
    });
  };

  getRegistrationPage = (req: express.Request, res: express.Response) => {
    res.render('registration', {});
  };

  getLoginPage = (req: express.Request, res: express.Response) => {
    res.render('login', {});
  };

  register = (req: express.Request, res: express.Response) => {
    const { email, username, password } = req.body;

    if (email.length < 1 || username.length < 1 || password.length < 1) {
      res.statusMessage = 'Got invalid data.';
      res.status(400);
      return res.render('registration', {});
    }

    this.userService.registerUser(email, username, password);
    res.redirect('/rooms');
  };

  login = async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;

    if (username.length < 1 || password.length < 1) {
      res.statusMessage = 'Got invalid data.';
      res.status(400);
      return res.render('login', {});
    }

    const user = await this.userService.getUserByUsername(username);

    if (user.password !== password) {
      res.statusMessage = 'Got invalid password.';
      res.status(400);
      return res.render('login', {});
    }
    res.render('rooms', {password: user.password});
    res.redirect('/rooms');
  };

  getRoomsPage = (req: express.Request, res: express.Response) => {
    res.render('rooms', {});
  };
}
