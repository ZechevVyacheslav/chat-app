import Room from '../core/Room';

export default interface IUserRepository {
    addRoom(room: Room): Promise<Room>;
    findRoomById(roomId: number): Promise<Room>;
    updateRoomTitle(roomId: number, updatedRoom: Room): Promise<Room>;
    deleteRoom(roomId: number): Promise<Room>;
    findRoomsByCreatorId(creatorId: number): Promise<Room[]>;
}