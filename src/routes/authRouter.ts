import * as express from 'express';
import AuthController from '../controllers/AuthController';
const router: express.Router = express.Router();
import { connection } from '../models/infrastructure/connection/Connection';
import { check } from 'express-validator';
import validate from '../middlewares/validate';

// Need DI implementation
import UserRepository from '../models/infrastructure/repository/UserRepository';
import UserService from '../models/infrastructure/serviceImpl/UserService';
import RoleRepository from '../models/infrastructure/repository/RoleRepository';
import RoleService from '../models/infrastructure/serviceImpl/RoleService';

(async () => {
  const userRepository: UserRepository = (await connection).getCustomRepository(
    UserRepository
  );
  const roleRepository: RoleRepository = (await connection).getCustomRepository(
    RoleRepository
  );
  const userService: UserService = new UserService(userRepository);
  const roleService: RoleService = new RoleService(roleRepository);
  const homeController: AuthController = new AuthController(
    userService,
    roleService
  );

  /**
   * @swagger
   *
   *  /user/register:
   *    post:
   *      summary: Returns a user info and token
   *      description: This should register new user
   *      tags:
   *        - User
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: email
   *          description: Email to use for registration
   *          in: form
   *          required: true
   *          type: string
   *        - name: username
   *          description: Username to use for registration
   *          in: form
   *          required: true
   *          type: string
   *        - name: password
   *          description: Password to use for registration.
   *          in: form
   *          required: true
   *          type: string
   *      responses:
   *        201:
   *          description: User registered
   *        409:
   *          description: Email or username were already taken
   *        422:
   *          description: Invalid body parameters
   */
  router.post(
    '/register',
    validate([
      check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .exists()
        .withMessage('Email must be exist.'),
      check('username')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid username.'),
      check('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid password.')
    ]),
    homeController.register
  );

  /**
   * @swagger
   *
   *  /user/login:
   *    post:
   *      summary: Returns a user info and token
   *      tags:
   *        - User
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: username
   *          description: Username to use for login.
   *          in: form
   *          required: true
   *          type: string
   *        - name: password
   *          description: Password to use for login.
   *          in: form
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: User loged in
   *        401:
   *          description: Worng username or password
   *        422:
   *          description: Invalid body parameters
   */
  router.post(
    '/login',
    validate([
      check('username')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid username.'),
      check('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid password.')
    ]),
    homeController.login
  );
})();

export { router };
