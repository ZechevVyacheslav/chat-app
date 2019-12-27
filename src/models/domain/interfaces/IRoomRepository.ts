import Room from '../core/Room';

export default interface IUserRepository {
    addRoom(room: Room): Promise<Room>;
    findRoomsByCreatorId(creatorId: number): Promise<Room[]>;
}