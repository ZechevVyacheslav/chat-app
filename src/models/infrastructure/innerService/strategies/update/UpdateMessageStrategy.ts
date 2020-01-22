import IUpdatingStrategy from '../../../../../Patterns/strategy/IUpdatingStrategy';
import Message from 'models/domain/core/Message';

export default class UpdateMessageStrategy implements IUpdatingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  update(messageId: number, updatedMessage: Message) {
    return this.repository.updateMessage(messageId, updatedMessage);
  }
}
