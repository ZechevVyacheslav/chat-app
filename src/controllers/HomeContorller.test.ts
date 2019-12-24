// import * as express from 'express';
// import { UserRepository } from '../models/infrastructure/repository/UserRepository';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';
import { HomeController } from './HomeController';
import { User } from '../models/domain/core/User';
jest.mock('../models/infrastructure/repository/UserRepository');
jest.mock('../models/infrastructure/serviceImpl/UserService');

let userRepository = {} as any;
let userService = new UserService(userRepository);
let homeController = new HomeController(userService);

let req;
let res;

beforeEach(() => {
  res = {
    statusCode: 200,
    redirect: jest.fn().mockImplementation(path => {
      res.statusCode = 302;
      return;
    }),
    status: jest.fn().mockImplementation(code => {
      res.statusCode = code;
      return;
    }),
    render: jest.fn()
  } as any;

  req = {
    body: {}
  } as any;
});

describe('Testing home controller', () => {
  describe('Registration process', () => {
    it('Testing registration (with valid body)', async () => {
      req.body = {
        email: 'test@gmail.com',
        username: 'Slava',
        password: '12345'
      };

      await homeController.register(req, res);

      expect(res.redirect).toHaveBeenCalledWith('/rooms');
      expect(res.statusCode).toEqual(302);
    });

    it('Testing registration (with invalid password)', async () => {
      req.body = {
        email: 'test@gmail.com',
        username: 'Slava',
        password: ''
      };

      await homeController.register(req, res);

      expect(res.statusCode).toEqual(400);
    });

    it('Testing registration (with invalid username)', async () => {
      req.body = {
        email: 'test@gmail.com',
        username: '',
        password: '12345'
      };

      await homeController.register(req, res);

      expect(res.statusCode).toEqual(400);
    });

    it('Testing registration (with invalid email)', async () => {
      req.body = {
        email: '',
        username: 'Slava',
        password: '12345'
      };

      await homeController.register(req, res);

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('Login process', () => {
    it('Testing login (with valid body)', async () => {
      req.body = {
        username: 'Slava',
        password: '12345'
      };

      const userFromBD = new User();
      userFromBD.username = 'Slava';
      userFromBD.password = '12345';
      
      userService.getUserByUsername = jest.fn((username: string) =>
        Promise.resolve(userFromBD)
      );

      await homeController.login(req, res);

      expect(userService.getUserByUsername).toBeCalledTimes(1);
      expect(res.redirect).toHaveBeenCalledWith('/rooms');
      expect(res.statusCode).toEqual(302);
    });

    it('Testing login (with invalid username)', async () => {
      req.body = {
        username: '',
        password: '12345'
      };

      await homeController.login(req, res);

      expect(res.statusCode).toEqual(400);
    });

    it('Testing login (with invalid password)', async () => {
      req.body = {
        username: 'Slava',
        password: '12'
      };

      const userFromBD = new User();
      userFromBD.username = 'Slava';
      userFromBD.password = 'password';
      
      userService.getUserByUsername = jest.fn((username: string) =>
        Promise.resolve(userFromBD)
      );

      await homeController.login(req, res);

      expect(userService.getUserByUsername).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('Rooms page', () => {
    it('Rendering rooms page', async () => {
      await homeController.getRoomsPage(req, res);

      expect(res.statusCode).toEqual(200);
    });
  });
});
