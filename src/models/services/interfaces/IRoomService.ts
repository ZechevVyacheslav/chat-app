import Room from '../../domain/core/Room';
// import { User } from '../../domain/core/User';

export default interface IRoomService {
  createRoom(title: string, creatorId: number): Promise<Room>;
  findRoomById(roomId: number): Promise<Room>;
  editRoomTitle(title: string, roomId: number): Promise<Room>;
  deleteRoom(roomId: number): Promise<Room>;
  findUserRooms(creatorId: number): Promise<Room[]>;
}
