import * as express from 'express';
import { HomeController } from '../controllers/HomeController';
const router: express.Router = express.Router();
import { connection } from '../models/infrastructure/connection/Connection';

// Need DI implementation
import { UserRepository } from '../models/infrastructure/repository/UserRepository';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';

(async () => {
  const userRepository = await connection.then(connection =>
    connection.getCustomRepository(UserRepository)
  );
  const userService: UserService = new UserService(userRepository);
  const homeController: HomeController = new HomeController(userService);

  router.get('/', homeController.getIndexPage);
  router.get('/register', homeController.getRegistrationPage);
  router.post('/register', homeController.register);
  router.get('/rooms', homeController.getRoomsPage);
})();

export { router };
