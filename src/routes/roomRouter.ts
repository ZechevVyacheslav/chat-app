import * as express from 'express';
const router: express.Router = express.Router();

import RoomController from '../controllers/RoomsController';
import { connection } from '../models/infrastructure/connection/Connection';
import isAuth from '../middlewares/is-auth';

// Need DI implementation
import RoomRepository from '../models/infrastructure/repository/RoomRepository';
import RoomService from '../models/infrastructure/serviceImpl/RoomService';

(async () => {
  const esteblishedConnection = await connection;
  const roomRepository = esteblishedConnection.getCustomRepository(
    RoomRepository
  );
  // const roomRepository = (await connection).getCustomRepository(RoomRepository);
  const roomService: RoomService = new RoomService(roomRepository);
  const roomController: RoomController = new RoomController(roomService);

  router.post('/', isAuth, roomController.createRoom);
  // router.post('/register', homeController.register);
  // router.get('/rooms', isAuth, homeController.getRoomsPage);
})();

export default router;
