import IDeletingStrategy from '../../../../../Patterns/strategy/IDeletingStrategy';

export default class DeleteMessageStrategy implements IDeletingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  delete(messageId: number) {
    return this.repository.deleteMessage(messageId);
  }
}
