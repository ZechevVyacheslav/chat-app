import { Router } from 'express';
import RouterBuilder from './RouterBuilder';
import RoomController from '../controllers/RoomsController';

import { check } from 'express-validator';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/isAdmin';
import isAdminOrModerator from '../middlewares/isAdminOrModerator';

const router: Router = Router();

(async () => {
  const routerBuilder = new RouterBuilder(router);
  const roomController: RoomController = await routerBuilder.buildRoomsController();

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
  routerBuilder.buildRouteWithGet('/', roomController.getRooms, null, [isAuth]);

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
  routerBuilder.buildRouteWithPost(
    '/',
    roomController.createRoom,
    [
      check('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Title can't be empty")
    ],
    [isAuth, isAdmin]
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
  routerBuilder.buildRouteWithDelete(
    '/:roomId',
    roomController.deleteRoom,
    [
      check('roomId')
        .trim()
        .not()
        .isEmpty()
    ],
    [isAuth, isAdmin]
  );

  // TODO Swagger: duplicate room
  routerBuilder.buildRouteWithPost(
    '/:roomId/duplicate',
    roomController.createRoomDublicate,
    [
      check('roomId')
        .trim()
        .not()
        .isEmpty()
    ],
    [isAuth, isAdmin]
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
  routerBuilder.buildRouteWithPut(
    '/',
    roomController.editRoom,
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
    [isAuth, isAdmin]
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
  routerBuilder.buildRouteWithGet(
    '/:roomId/chat',
    roomController.getRoomMessages,
    null,
    [isAuth]
  );

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
  routerBuilder.buildRouteWithPost(
    '/:roomId/chat',
    roomController.writeMessage,
    [
      check('text')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Message can't be empty")
    ],
    [isAuth]
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
  routerBuilder.buildRouteWithPut(
    '/:roomId/chat',
    roomController.updateMessage,
    [
      check('text')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Message can't be empty")
    ],
    [isAuth, isAdminOrModerator]
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
  routerBuilder.buildRouteWithDelete(
    '/:roomId/chat/:messageId',
    roomController.deleteMessage,
    null,
    [isAuth, isAdminOrModerator]
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
  routerBuilder.buildRouteWithPost(
    '/:roomId/invite/:userId',
    roomController.inviteUserToRoom,
    null,
    [isAuth, isAdminOrModerator]
  );
})();

export default router;
