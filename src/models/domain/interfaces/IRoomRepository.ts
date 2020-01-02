import Room from '../core/Room';
import { User } from '../core/User';

export default interface IUserRepository {
  addRoom(room: Room): Promise<Room>;
  addUserToRoom(user: User, roomId: number): Promise<Room>;
  findRoomById(roomId: number): Promise<Room>;
  updateRoom(roomId: number, updatedRoom: Room): Promise<Room>;
  deleteRoom(roomId: number): Promise<Room>;
  findRoomsByCreatorId(creatorId: number): Promise<Room[]>;
}
