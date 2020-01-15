import IUserRequest from '../userModel/IUserRequest';
import IRoomService from '../models/services/interfaces/IRoomService';
import IMessageService from '../models/services/interfaces/IMessageService';
import User from '../models/domain/core/User';
import Message from '../models/domain/core/Message';
import { Response } from 'express';
import { validationResult } from 'express-validator';
import Room from '../models/domain/core/Room';

export default class RoomController {
  private roomService: IRoomService;
  private messageService: IMessageService;

  constructor(roomService: IRoomService, messageService: IMessageService) {
    this.roomService = roomService;
    this.messageService = messageService;
  }

  createRoom = async (req: IUserRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const { title } = req.body;
    const room = await this.roomService.createRoom(title, userId);

    res.status(201).json({
      message: 'Room created!',
      room
    });
  };

  getRooms = async (req: IUserRequest, res: Response) => {
    const userId = req.userId;
    const rooms = await this.roomService.findUserRooms(userId);

    res.status(200).json({
      message: 'User rooms',
      userId,
      rooms
    });
  };

  deleteRoom = async (req: IUserRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const roomId: number = +req.params.roomId;

    const room = await this.roomService.findRoomById(roomId);
    if (!room) {
      return res.status(404).json({
        message: 'Room not found'
      });
    }

    const deletedRoom = await this.roomService.deleteRoom(roomId);
    res.status(200).json({
      message: 'Room deleted',
      room: deletedRoom
    });
  };

  editRoom = async (req: IUserRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { title, roomId } = req.body;

    const room = await this.roomService.findRoomById(roomId);
    if (!room) {
      return res.status(404).json({
        message: 'Room not found'
      });
    }

    const updatedRoom = await this.roomService.editRoomTitle(title, roomId);
    res.status(200).json({
      message: 'Room was edited',
      room: updatedRoom
    });
  };

  inviteUserToRoom = async (req: IUserRequest, res: Response) => {
    const { roomId, userId } = req.params;
    const user = new User();
    user.id = +userId;

    const room = this.roomService.inviteUserToRoom(user, +roomId);
    res.status(200).json({
      message: 'OK'
    });
  };

  writeMessage = async (req: IUserRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const roomId: number = +req.params.roomId;
    const room = await this.roomService.findRoomById(roomId);
    if (!room) {
      return res.status(404).json({
        message: 'Room not found'
      });
    }

    const { text } = req.body;
    const userId = req.userId;
    const user = new User();
    user.id = userId;

    const message: Message = new Message();
    message.room = room;
    message.user = user;
    message.text = text;
    const addedMessage: Message = await this.messageService.addMessage(message);

    res.status(200).json({
      message: 'Message was added',
      msg: addedMessage
    });
  };

  updateMessage = async (req: IUserRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const roomId: number = +req.params.roomId;
    const room: Room = await this.roomService.findRoomById(roomId);
    if (!room) {
      return res.status(404).json({
        message: 'Room not found'
      });
    }

    const { messageId, text } = req.body;
    const userId = req.userId;

    const message: Message = await this.messageService.getMessageById(
      messageId
    );
    message.text = text;
    const updatedMessage: Message = await this.messageService.updateMessage(
      messageId,
      message
    );

    res.status(200).json({
      message: 'Message was updated',
      msg: updatedMessage
    });
  };

  deleteMessage = async (req: IUserRequest, res: Response) => {
    const roomId: number = +req.params.roomId;
    const room: Room = await this.roomService.findRoomById(roomId);
    if (!room) {
      return res.status(404).json({
        message: 'Room not found'
      });
    }

    const userId = req.userId;
    const messageId: number = +req.params.messageId;

    const deletedMessage: Message = await this.messageService.deleteMessage(
      messageId
    );

    res.status(200).json({
      message: 'Message was deleted',
      msg: deletedMessage
    });
  };

  getRoomMessages = async (req: IUserRequest, res: Response) => {
    // const userId = req.userId;
    const roomId: number = +req.params.roomId;
    const messages: Message[] = await this.messageService.getMessagesByRoomId(
      roomId
    );

    res.status(200).json({
      message: 'Chat messages',
      messages
    });
  };
}
