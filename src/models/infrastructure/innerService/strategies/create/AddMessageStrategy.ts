import IAddingStrategy from '../../../../../Patterns/strategy/IAddingStrategy';

export default class AddMessageStrategy implements IAddingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  add(message) {
    return this.repository.addMessage(message);
  }
}
