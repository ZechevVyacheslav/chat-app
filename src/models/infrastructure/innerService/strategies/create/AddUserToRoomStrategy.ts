import IAddingStrategy from '../../../../../Patterns/strategy/IAddingStrategy';

export default class AddUserToRoomStrategy implements IAddingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  add(args) {
    const { roomId, user } = args;
    return this.repository.addUserToRoom(user, roomId);
  }
}
