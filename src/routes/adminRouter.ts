import { Router } from 'express';
const router: Router = Router();

import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/isAdmin';
import { check } from 'express-validator';
import validate from '../middlewares/validate';

import { connection } from '../models/infrastructure/connection/Connection';

import RoleRepository from '../models/infrastructure/repository/RoleRepository';
import RoleService from '../models/infrastructure/serviceImpl/RoleService';
import AdminController from '../controllers/AdminController';
import UserRepository from '../models/infrastructure/repository/UserRepository';
import UserService from '../models/infrastructure/serviceImpl/UserService';

(async () => {
  const establishedConnection = await connection;
  const roleRepository = establishedConnection.getCustomRepository(
    RoleRepository
  );
  const roleService: RoleService = new RoleService(roleRepository);
  const userRepository: UserRepository = establishedConnection.getCustomRepository(
    UserRepository
  );
  const userService: UserService = new UserService(userRepository);
  const adminController: AdminController = new AdminController(
    roleService,
    userService
  );

  // // Get all roles
  // router.get('/roles')

  /**
   * @swagger
   *
   *  /admin/roles:
   *    post:
   *      summary: Returns a new role
   *      tags:
   *        - Admin
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: title
   *          description: Title of the new role
   *          in: form
   *          required: true
   *          type: string
   *      responses:
   *        201:
   *          description: Role was created
   */
  router.post(
    '/roles',
    validate([
      check('title')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid role title.')
        .exists()
        .withMessage('Role title must be exist.')
    ]),
    isAuth,
    isAdmin,
    adminController.createRole
  );

  // Get users list
  router.get('/users');

  // Info about 1 user
  router.get('/users/:userId');

  /**
   * @swagger
   *
   *  /admin/users/{userId}/user:
   *    patch:
   *      summary: Returns user with new role
   *      tags:
   *        - Admin
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: userId
   *          description: Id of user to change
   *          in: path
   *          required: true
   *          type: string
   *      responses:
   *        201:
   *          description: User role granted
   */
  router.patch('/users/:userId/user', adminController.assignUserRole);

  /**
   * @swagger
   *
   *  /admin/users/{userId}/moderator:
   *    patch:
   *      summary: Returns user with new role
   *      tags:
   *        - Admin
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: userId
   *          description: Id of user to change
   *          in: path
   *          required: true
   *          type: string
   *      responses:
   *        201:
   *          description: Moderator role granted
   */
  router.patch('/users/:userId/moderator', adminController.assignModeratorRole);

  /**
   * @swagger
   *
   *  /admin/users/{userId}/admin:
   *    patch:
   *      summary: Returns user with new role
   *      tags:
   *        - Admin
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: userId
   *          description: Id of user to change
   *          in: path
   *          required: true
   *          type: string
   *      responses:
   *        201:
   *          description: Admin role granted
   */
  router.patch('/users/:userId/admin', adminController.assignAdminRole);
})();

export default router;
