import IAddingStrategy from '../../../../../Patterns/strategy/IAddingStrategy';

export default class AddRoomStrategy implements IAddingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  add(role) {
    return this.repository.addRole(role);
  }
}
