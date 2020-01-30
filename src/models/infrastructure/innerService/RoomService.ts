import IRoomService from '../../services/interfaces/IRoomService';
import IRoomRepository from '../../domain/interfaces/IRoomRepository';
import Room from '../../domain/core/Room';
import User from '../../domain/core/User';

import BaseService from './BaseService';

import AddRoomStrategy from './strategies/create/AddRoomStrategy';
import FindRoomByIdStrategy from './strategies/read/FindRoomByIdStrategy';
import FindRoomByUserIdStrategy from './strategies/read/FindRoomByUserIdStrategy';
import UpdateRoomStrategy from './strategies/update/UpdateRoomStrategy';
import DeleteRoomStrategy from './strategies/delete/DeleteRoomStrategy';
import AddUserToRoomStrategy from './strategies/create/AddUserToRoomStrategy';
import DuplicateRoomStrategy from './strategies/create/DuplicateRoomStrategy';

export default class RoomService extends BaseService implements IRoomService {
  private roomRepository: IRoomRepository;

  constructor(roomRepository: IRoomRepository) {
    super();
    this.roomRepository = roomRepository;
  }

  createRoom(title: string, creatorId: number) {
    const room = new Room();
    room.title = title;
    room.creatorId = creatorId;
    room.members = [];
    this.invoker.changeAddingStragegy(new AddRoomStrategy(this.roomRepository));
    return this.addingStrategy.add(room);
  }

  findRoomById(roomId: number) {
    this.invoker.changeSearchingStrategy(
      new FindRoomByIdStrategy(this.roomRepository)
    );
    return this.searchingStrategy.find(roomId);
  }

  findUserRooms(creatorId: number) {
    this.invoker.changeSearchingStrategy(
      new FindRoomByUserIdStrategy(this.roomRepository)
    );
    return this.searchingStrategy.find(creatorId);
  }

  editRoomTitle(title: string, roomId: number) {
    const room = new Room();
    room.title = title;
    this.invoker.changeUpdatingStrategy(
      new UpdateRoomStrategy(this.roomRepository)
    );
    return this.updatingStrategy.update(roomId, room);
  }

  deleteRoom(roomId: number) {
    this.invoker.changeDeletingStrategy(
      new DeleteRoomStrategy(this.roomRepository)
    );
    return this.deletingStrategy.delete(roomId);
  }

  duplicateRoom(roomId: number) {
    this.invoker.changeAddingStragegy(
      new DuplicateRoomStrategy(this.roomRepository)
    );
    return this.addingStrategy.add(roomId)
  }

  inviteUserToRoom(user: User, roomId: number) {
    this.invoker.changeAddingStragegy(
      new AddUserToRoomStrategy(this.roomRepository)
    );
    return this.addingStrategy.add({ user, roomId });
  }
}
