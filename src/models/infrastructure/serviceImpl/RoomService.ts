import IRoomService from '../../services/interfaces/IRoomService';
import IRoomRepository from '../../domain/interfaces/IRoomRepository';
import Room from '../../domain/core/Room';

export default class RoomService implements IRoomService {
  private roomRepository: IRoomRepository;

  constructor(roomRepository: IRoomRepository) {
    this.roomRepository = roomRepository;
  }

  createRoom(title: string, creatorId: number) {
    const room = new Room();
    room.title = title;
    room.creatorId = creatorId;
    room.members = [];
    return this.roomRepository.addRoom(room);
  }

  findRoomById(roomId: number) {
    return this.roomRepository.findRoomById(roomId);
  }

  editRoomTitle(title: string, roomId: number) {
    const room = new Room();
    room.title = title;
    return this.roomRepository.updateRoomTitle(roomId, room);
  }

  deleteRoom(roomId: number) {
    return this.roomRepository.deleteRoom(roomId);
  }

  findUserRooms(creatorId: number) {
    return this.roomRepository.findRoomsByCreatorId(creatorId);
  }
}
