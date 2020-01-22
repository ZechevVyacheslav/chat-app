import IAddingStrategy from '../../../../../Patterns/strategy/IAddingStrategy';

export default class AddRoleToUserStrategy implements IAddingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  add(room) {
    return this.repository.addRoom(room);
  }
}
