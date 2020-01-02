import IUserRequest from '../userModel/IUserRequest';
import IRoomService from 'models/services/interfaces/IRoomService';
import { Response } from 'express';
import { validationResult } from 'express-validator';

export default class RoomController {
  private roomService: IRoomService;

  constructor(roomService: IRoomService) {
    this.roomService = roomService;
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

    const { roomId } = req.body;

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
}
