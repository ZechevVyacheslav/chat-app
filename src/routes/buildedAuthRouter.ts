import { Router } from 'express';
import RouterBuilder from './RouterBuilder';
import AuthController from '../controllers/AuthController';

import { check } from 'express-validator';

const router: Router = Router();

(async () => {
  const routerBuilder = new RouterBuilder(router);
  const authController: AuthController = await routerBuilder.buildAuthController();

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
  routerBuilder.buildRouteWithPost('/register', authController.register, [
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
  ]);

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
  routerBuilder.buildRouteWithPost('/login', authController.login, [
    check('username')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid username.'),
    check('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.')
  ]);
})();

export default router;
