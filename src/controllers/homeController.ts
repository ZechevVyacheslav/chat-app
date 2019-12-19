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

  register = (req: express.Request, res: express.Response) => {
    const {email, username, password} = req.body;

    if(email.length < 1 || username.length < 1 || password.length < 1) {
      res.statusMessage = 'Got invalid data.'
      res.status(400);
      return res.render('registration', {});
    }

    this.userService.registerUser(email, username, password);
    res.redirect('/rooms');
  };

  getRoomsPage = (req: express.Request, res: express.Response) => {
    res.render('rooms', {});
  };
}
