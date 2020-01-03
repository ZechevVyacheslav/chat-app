import { Router } from 'express';
const router: Router = Router();

import isAuth from 'middlewares/is-auth';

import { connection } from 'models/infrastructure/connection/Connection';

import RoleRepository from 'models/infrastructure/repository/RoleRepository';
import RoleService from 'models/infrastructure/serviceImpl/RoleService';
import AdminController from 'controllers/AdminController';

(async () => {
  const establishedConnection = await connection;
  const roleRepository = establishedConnection.getCustomRepository(
    RoleRepository
  );
  const roleService: RoleService = new RoleService(roleRepository);
  const adminController = new AdminController(roleService);
})();

// // Get all roles
// router.get('/roles')

// Create role
router.post('/roles')

// Get users list
router.get('/users')

// Info about 1 user
router.get('/users/:userId')

// Change user role
router.patch('/users/:userId')

export default router;