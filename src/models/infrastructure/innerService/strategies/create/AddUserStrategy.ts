import IAddingStrategy from '../../../../../Patterns/strategy/IAddingStrategy';

export default class AddUserStrategy implements IAddingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  add(user) {
    return this.repository.addUser(user);
  }
}