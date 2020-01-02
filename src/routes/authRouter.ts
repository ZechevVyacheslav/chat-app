import * as express from 'express';
import { AuthController } from '../controllers/AuthController';
const router: express.Router = express.Router();
import { connection } from '../models/infrastructure/connection/Connection';
import { check } from 'express-validator';

// Need DI implementation
import { UserRepository } from '../models/infrastructure/repository/UserRepository';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';

(async () => {
  const userRepository = (await connection).getCustomRepository(UserRepository);
  const userService: UserService = new UserService(userRepository);
  const homeController: AuthController = new AuthController(userService);

  /**
   * @swagger
   *
   *  /user/login:
   *    post:
   *      summary: Returns a list of users.
   *      description: This should login user
   *      tags:
   *        - Users
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: username
   *          description: Username to use for login.
   *          in: form
   *          required: true
   *          type: string
   *        - name: password
   *          description: User's password.
   *          in: form
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: login
   *
   */
  router.post(
    '/login',
    [
      check('username')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid username.'),
      check('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid password.')
    ],
    homeController.login
  );
  router.post(
    '/register',
    [
      check('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
      check('username')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid username.'),
      check('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid password.')
    ],
    homeController.register
  );
})();

export { router };
