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

  findUserRooms(creatorId: number) {
    return this.roomRepository.findRoomsByCreatorId(creatorId);
  }
}
