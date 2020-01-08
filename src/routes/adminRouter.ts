import { Router } from 'express';
const router: Router = Router();

import isAuth from '../middlewares/is-auth';

import { connection } from '../models/infrastructure/connection/Connection';

import RoleRepository from '../models/infrastructure/repository/RoleRepository';
import RoleService from '../models/infrastructure/serviceImpl/RoleService';
import AdminController from '../controllers/AdminController';
import { UserRepository } from '../models/infrastructure/repository/UserRepository';
import { UserService } from '../models/infrastructure/serviceImpl/UserService';

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
  const adminController: AdminController = new AdminController(roleService, userService);

  // // Get all roles
  // router.get('/roles')

  // Create role
  router.post('/roles', adminController.createRole);

  // Get users list
  router.get('/users');

  // Info about 1 user
  router.get('/users/:userId');

  // Change user role 
  router.patch('/users/:userId/user', adminController.assignUserRole);

  // Change admin role
  router.patch('/users/:userId/admin', adminController.assignAdminRole);
})();

export default router;
