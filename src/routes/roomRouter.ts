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
  const roomService: RoomService = new RoomService(roomRepository);
  const roomController: RoomController = new RoomController(roomService);

  router.get('/', isAuth, roomController.getRooms);
  router.post('/', isAuth, roomController.createRoom);
  router.delete('/', isAuth, roomController.deleteRoom);
  router.put('/', isAuth, roomController.editRoom);
})();

export default router;
