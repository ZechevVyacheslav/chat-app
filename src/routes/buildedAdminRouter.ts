import { Router } from 'express';
import RouterBuilder from './RouterBuilder';
import AdminController from '../controllers/AdminController';

import { check } from 'express-validator';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/isAdmin';

const router: Router = Router();

(async () => {
  const routerBuilder = new RouterBuilder(router);
  const adminController: AdminController = await routerBuilder.buildAdminController();

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
  routerBuilder.buildRouteWithPost(
    '/roles',
    adminController.createRole,
    [
      check('title')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid role title.')
        .exists()
        .withMessage('Role title must be exist.')
    ],
    [isAuth, isAdmin]
  );

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
  routerBuilder.buildRouteWithPatch(
    '/users/:userId/user',
    adminController.assignUserRole
  );

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
  routerBuilder.buildRouteWithPatch(
    '/users/:userId/moderator',
    adminController.assignModeratorRole
  );
  
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
  routerBuilder.buildRouteWithPatch(
    '/users/:userId/admin',
    adminController.assignAdminRole
  );
})();

export default router;
