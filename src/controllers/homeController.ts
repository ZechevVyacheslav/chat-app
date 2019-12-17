import * as express from 'express';
import { connection } from '../models/connection/Connection';
import { User } from '../models/entity/User';

export const getIndexPage = (req: express.Request, res: express.Response) => {
  res.render('index', {
    message: 'Hello on the index page'
  });
};

export const getUsersPage = (req: express.Request, res: express.Response) => {
  connection
    .then(async connection => {
      // const users: User[] = await connection.manager.find(User);
      const users: User[] = await connection
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .getMany();
      const usersNames: string[] = users.map(user => user.username);
      res.render('users', {
        users: usersNames
      });
    })
    .catch(error => console.error('Error ', error));
};
