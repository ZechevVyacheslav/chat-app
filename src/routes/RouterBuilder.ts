import Builder from '../Patterns/Builder';
import { Router } from 'express';

import Connection from '../models/infrastructure/connection/Connection';

import RoleRepository from '../models/infrastructure/repository/RoleRepository';
import UserRepository from '../models/infrastructure/repository/UserRepository';
import RoomRepository from '../models/infrastructure/repository/RoomRepository';
import MessageRepository from '../models/infrastructure/repository/MessageRepository';
// import RoleService from '../models/infrastructure/serviceImpl/RoleService';
import RoleService from '../models/infrastructure/innerService/RoleService';
// import UserService from '../models/infrastructure/serviceImpl/UserService';
import UserService from '../models/infrastructure/innerService/UserService';
// import RoomService from '../models/infrastructure/serviceImpl/RoomService';
import RoomService from '../models/infrastructure/innerService/RoomService';
// import MessageService from '../models/infrastructure/serviceImpl/MessageService';
import MessageService from '../models/infrastructure/innerService/MessageService';
import AdminController from '../controllers/AdminController';
import AuthController from '../controllers/AuthController';
import RoomController from '../controllers/RoomsController';

import validate from '../middlewares/validate';

export default class RouterBuilder implements Builder {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  buildRouteWithGet(path, controllerFunction, validations?, middlewares?) {
    if (!validations && !middlewares) {
      this.router.get(path, controllerFunction);
      return;
    }
    if (!validations) {
      this.router.get(path, ...middlewares, controllerFunction);
      return;
    }
    if (!middlewares) {
      this.router.get(path, validate(validations), controllerFunction);
      return;
    }

    this.router.get(
      path,
      validate(validations),
      ...middlewares,
      controllerFunction
    );
  }

  buildRouteWithPost(path, controllerFunction, validations?, middlewares?) {
    if (!validations && !middlewares) {
      this.router.post(path, controllerFunction);
      return;
    }
    if (!validations) {
      this.router.post(path, ...middlewares, controllerFunction);
      return;
    }
    if (!middlewares) {
      this.router.post(path, validate(validations), controllerFunction);
      return;
    }

    this.router.post(
      path,
      validate(validations),
      ...middlewares,
      controllerFunction
    );
  }

  buildRouteWithPut(path, controllerFunction, validations?, middlewares?) {
    if (!validations && !middlewares) {
      this.router.put(path, controllerFunction);
      return;
    }
    if (!validations) {
      this.router.put(path, ...middlewares, controllerFunction);
      return;
    }
    if (!middlewares) {
      this.router.put(path, validate(validations), controllerFunction);
      return;
    }

    this.router.put(
      path,
      validate(validations),
      ...middlewares,
      controllerFunction
    );
  }

  buildRouteWithPatch(path, controllerFunction, validations?, middlewares?) {
    if (!validations && !middlewares) {
      this.router.patch(path, controllerFunction);
      return;
    }
    if (!validations) {
      this.router.patch(path, ...middlewares, controllerFunction);
      return;
    }
    if (!middlewares) {
      this.router.patch(path, validate(validations), controllerFunction);
      return;
    }

    this.router.patch(
      path,
      validate(validations),
      ...middlewares,
      controllerFunction
    );
  }

  buildRouteWithDelete(path, controllerFunction, validations?, middlewares?) {
    if (!validations && !middlewares) {
      this.router.delete(path, controllerFunction);
      return;
    }
    if (!validations) {
      this.router.delete(path, ...middlewares, controllerFunction);
      return;
    }
    if (!middlewares) {
      this.router.delete(path, validate(validations), controllerFunction);
      return;
    }

    this.router.delete(
      path,
      validate(validations),
      ...middlewares,
      controllerFunction
    );
  }

  async buildAdminController() {
    const establishedConnection = await Connection.getInstance().getConnection();
    const roleRepository = establishedConnection.getCustomRepository(
      RoleRepository
    );
    const userRepository: UserRepository = establishedConnection.getCustomRepository(
      UserRepository
    );
    const roleService: RoleService = new RoleService(roleRepository);
    const userService: UserService = new UserService(userRepository);
    const adminController: AdminController = new AdminController(
      roleService,
      userService
    );
    return adminController;
  }

  async buildAuthController() {
    const establishedConnection = await Connection.getInstance().getConnection();
    const roleRepository = establishedConnection.getCustomRepository(
      RoleRepository
    );
    const userRepository: UserRepository = establishedConnection.getCustomRepository(
      UserRepository
    );
    const roleService: RoleService = new RoleService(roleRepository);
    const userService: UserService = new UserService(userRepository);
    const authController: AuthController = new AuthController(
      userService,
      roleService
    );
    return authController;
  }

  async buildRoomsController() {
    const establishedConnection = await Connection.getInstance().getConnection();
    const roomRepository = establishedConnection.getCustomRepository(
      RoomRepository
    );
    const messageRepository = establishedConnection.getCustomRepository(
      MessageRepository
    );
    const roomService: RoomService = new RoomService(roomRepository);
    const messageService: MessageService = new MessageService(
      messageRepository
    );
    const roomController: RoomController = new RoomController(
      roomService,
      messageService
    );
    return roomController;
  }
}
