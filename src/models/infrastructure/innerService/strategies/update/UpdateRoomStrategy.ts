import IUpdatingStrategy from '../../../../../Patterns/strategy/IUpdatingStrategy';
import Room from 'models/domain/core/Room';

export default class UpdateRoomStrategy implements IUpdatingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  update(roomId: number, updatedRoom: Room) {
    return this.repository.updateRoom(roomId, updatedRoom);
  }
}
