import * as express from 'express';
const router: express.Router = express.Router();

import RoomController from '../controllers/RoomsController';
import { connection } from '../models/infrastructure/connection/Connection';
import isAuth from '../middlewares/is-auth';
import { check } from 'express-validator';

// Need DI implementation
import RoomRepository from '../models/infrastructure/repository/RoomRepository';
import RoomService from '../models/infrastructure/serviceImpl/RoomService';
import MessageRepository from '../models/infrastructure/repository/MessageRepository';
import MessageService from '../models/infrastructure/serviceImpl/MessageService';

(async () => {
  const esteblishedConnection = await connection;
  const roomRepository = esteblishedConnection.getCustomRepository(
    RoomRepository
  );
  const messageRepository = esteblishedConnection.getCustomRepository(
    MessageRepository
  );
  const roomService: RoomService = new RoomService(roomRepository);
  const messageService: MessageService = new MessageService(messageRepository);
  const roomController: RoomController = new RoomController(
    roomService,
    messageService
  );

  router.get('/', isAuth, roomController.getRooms);
  router.post(
    '/',
    isAuth,
    [
      check('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Title can't be empty")
    ],
    roomController.createRoom
  );
  router.delete(
    '/',
    isAuth,
    [
      check('roomId')
        .trim()
        .not()
        .isEmpty()
    ],
    roomController.deleteRoom
  );
  router.put(
    '/',
    isAuth,
    [
      check('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Title can't be empty"),
      check('roomId')
        .trim()
        .not()
        .isEmpty()
    ],
    roomController.editRoom
  );
  router.get('/:roomId/chat', isAuth, roomController.getRoomMessages);
  router.post('/:roomId/chat', isAuth, [
    check('text')
      .trim()
      .not()
      .isEmpty()
      .withMessage("Message can't be empty")
  ], roomController.writeMessage);
  router.post(
    '/:roomId/invite/:userId',
    isAuth,
    roomController.inviteUserToRoom
  );
})();

export default router;
