import 'reflect-metadata';

import { EntityRepository, Repository } from 'typeorm';
import IRoomRepository from '../../domain/interfaces/IRoomRepository';
import Room from '../../domain/core/Room';
// import { User } from '../../domain/core/User';

@EntityRepository(Room)
export default class RoomRepositroy extends Repository<Room>
  implements IRoomRepository {
  addRoom(room: Room) {
    return this.save(room);
  }

  findRoomsByCreatorId(creatorId: number) {
    return this.find({ where: { creatorId } });
  }
}
