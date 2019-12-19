import * as request from 'supertest';
import { app } from '../app';

// import * as express from 'express';
// import { HomeController } from '../controllers/HomeController';
// import { connection } from '../models/infrastructure/connection/Connection';
// // Need DI implementation
// import { UserRepository } from '../models/infrastructure/repository/UserRepository';
// import { UserService } from '../models/infrastructure/serviceImpl/UserService';

// const homeController = (async () => {
//   const userRepository = await connection.then(connection =>
//     connection.getCustomRepository(UserRepository)
//   );
//   const userService = new UserService(userRepository);
//   const homeController = new HomeController(userService);
//   return homeController;
// })();

describe('Testing home controller', () => {
  it('should return 200', async () => {
    const result = await request(app).get("/");
    console.log(result.status);
    expect(result.status).toEqual(200);
  });
});
