import * as express from 'express';
import { UserRepository } from '../models/infrastructure/repository/UserRepository';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';
import { HomeController } from './HomeController';
jest.mock('../models/infrastructure/repository/UserRepository');
jest.mock('../models/infrastructure/serviceImpl/UserService');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const homeController = new HomeController(userService);

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

  describe('Index page', () => {
    it('Rendering index page', async () => {
      await homeController.getIndexPage(req, res);

      expect(res.statusCode).toEqual(200);
    });
  });

  describe('Registration page', () => {
    it('Rendering registration page', async () => {
      await homeController.getRegistrationPage(req, res);

      expect(res.statusCode).toEqual(200);
    });
  });

  describe('Rooms page', () => {
    it('Rendering rooms page', async () => {
      await homeController.getRoomsPage(req, res);

      expect(res.statusCode).toEqual(200);
    });
  });
});
