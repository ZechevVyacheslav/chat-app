import * as express from 'express';
const router: express.Router = express.Router();

import RoomController from '../controllers/RoomsController';
import { connection } from '../models/infrastructure/connection/Connection';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/isAdmin';
import isAdminOrModerator from '../middlewares/isAdminOrModerator';
import { check } from 'express-validator';

// Need DI implementation
import RoomRepository from '../models/infrastructure/repository/RoomRepository';
import RoomService from '../models/infrastructure/serviceImpl/RoomService';
import MessageRepository from '../models/infrastructure/repository/MessageRepository';
import MessageService from '../models/infrastructure/serviceImpl/MessageService';

(async () => {
  const establishedConnection = await connection;
  const roomRepository = establishedConnection.getCustomRepository(
    RoomRepository
  );
  const messageRepository = establishedConnection.getCustomRepository(
    MessageRepository
  );
  const roomService: RoomService = new RoomService(roomRepository);
  const messageService: MessageService = new MessageService(messageRepository);
  const roomController: RoomController = new RoomController(
    roomService,
    messageService
  );

  /**
   * @swagger
   *
   *  /rooms:
   *    get:
   *      summary: Returns all rooms of auth user
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Room
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: User rooms
   */
  router.get('/', isAuth, roomController.getRooms);

  /**
   * @swagger
   *
   *  /rooms:
   *    post:
   *      summary: Create new room for auth user
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Room
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: title
   *          description: Title of the room
   *          in: form
   *          required: true
   *          type: string
   *      responses:
   *        201:
   *          description: Room created
   *        422:
   *          description: Invalid body parameters
   */
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
    isAdmin,
    roomController.createRoom
  );

  /**
   * @swagger
   *
   *  /rooms/{roomId}:
   *    delete:
   *      summary: Delete room of the user
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Room
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: roomId
   *          description: Id of the room
   *          in: path
   *          required: true
   *          type: number
   *      responses:
   *        200:
   *          description: Room deleted
   *        404:
   *          description: Room not found
   *        422:
   *          description: Invalid body parameters
   */
  router.delete(
    '/:roomId',
    isAuth,
    [
      check('roomId')
        .trim()
        .not()
        .isEmpty()
    ],
    isAdmin,
    roomController.deleteRoom
  );

  /**
   * @swagger
   *
   *  /rooms:
   *    put:
   *      summary: Update room of the user
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Room
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: title
   *          description: New title
   *          in: form
   *          required: true
   *          type: number
   *        - name: roomId
   *          description: Id of the room
   *          in: form
   *          required: true
   *          type: number
   *      responses:
   *        200:
   *          description: Room updated
   *        404:
   *          description: Room not found
   *        422:
   *          description: Invalid body parameters
   */
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
    isAdmin,
    roomController.editRoom
  );

  /**
   * @swagger
   *
   *  /rooms/{roomId}/chat:
   *    get:
   *      summary: Get messages in chat of auth user
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Room
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: roomId
   *          description: Id of user to change
   *          in: path
   *          required: true
   *          type: number
   *      responses:
   *        200:
   *          description: Chat messages
   */
  router.get('/:roomId/chat', isAuth, roomController.getRoomMessages);

  /**
   * @swagger
   *
   *  /rooms/{roomId}/chat:
   *    post:
   *      summary: Write new message in room
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Room
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: roomId
   *          description: Id of user to change
   *          in: path
   *          required: true
   *          type: number
   *        - name: text
   *          description: New title
   *          in: form
   *          required: true
   *          type: number
   *      responses:
   *        200:
   *          description: Message created
   *        404:
   *          description: Room not found
   *        422:
   *          description: Invalid body parameters
   */
  router.post(
    '/:roomId/chat',
    isAuth,
    [
      check('text')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Message can't be empty")
    ],
    roomController.writeMessage
  );

  /**
   * @swagger
   *
   *  /rooms/{roomId}/chat:
   *    put:
   *      summary: Update message in room
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Room
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: roomId
   *          description: Id of room where message located
   *          in: path
   *          required: true
   *          type: number
   *        - name: messageId
   *          description: Id of message to be updated
   *          in: form
   *          required: true
   *          type: number
   *        - name: text
   *          description: New title
   *          in: form
   *          required: true
   *          type: number
   *      responses:
   *        200:
   *          description: Message updated
   *        404:
   *          description: Room or message not found
   *        422:
   *          description: Invalid body parameters
   */
  router.put(
    '/:roomId/chat',
    isAuth,
    [
      check('text')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Message can't be empty")
    ],
    isAdminOrModerator,
    roomController.updateMessage
  );

  /**
   * @swagger
   *
   *  /rooms/{roomId}/chat/{messageId}:
   *    delete:
   *      summary: Delete message in room
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Room
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: roomId
   *          description: Id of room where message located
   *          in: path
   *          required: true
   *          type: number
   *        - name: messageId
   *          description: Id of message to be updated
   *          in: path
   *          required: true
   *          type: number
   *      responses:
   *        200:
   *          description: Message deleted
   *        404:
   *          description: Room or message not found
   */
  router.delete(
    '/:roomId/chat/:messageId',
    isAuth,
    isAdminOrModerator,
    roomController.deleteMessage
  );

  /**
   * @swagger
   *
   *  /rooms/{roomId}/invite/{userId}:
   *    post:
   *      summary: Inviting user to join room
   *      security:
   *        - bearerAuth: []
   *      tags:
   *        - Room
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: roomId
   *          description: Id of room to which user will join
   *          in: path
   *          required: true
   *          type: number
   *        - name: userId
   *          description: Id of user who got invited
   *          in: path
   *          required: true
   *          type: number
   *      responses:
   *        200:
   *          description: User joined
   */
  router.post(
    '/:roomId/invite/:userId',
    isAuth,
    isAdmin,
    roomController.inviteUserToRoom
  );
})();

export default router;
