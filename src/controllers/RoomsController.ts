import IUserRequest from '../middlewares/IUserRequest';
import IRoomService from 'models/services/interfaces/IRoomService';
import * as express from 'express';

export default class RoomController {
  private roomService: IRoomService;

  constructor(roomService: IRoomService) {
    this.roomService = roomService;
  }

  createRoom = async (req: IUserRequest, res: express.Response) => {
    const userId = req.userId;
    const { title } = req.body;
    const room = await this.roomService.createRoom(title, userId);

    res.status(201).json({
      message: 'Room created!',
      room
    });
  };
}
