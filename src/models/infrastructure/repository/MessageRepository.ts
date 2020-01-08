import { EntityRepository, Repository } from 'typeorm';
import IMessageRepository from '../../domain/interfaces/IMessageRepository';
import Message from '../../domain/core/Message';

@EntityRepository(Message)
export default class MessageRepositroy extends Repository<Message>
  implements IMessageRepository {
  addMessage(message: Message) {
    return this.save(message);
  }

  getMessageById(messageId: number) {
    return this.findOne(messageId);
  }

  getMessagesByRoomId(roomId: number) {
    return this.find({ relations: ['room'] }).then(messages => {
      return messages.filter(message => message.room.id === roomId);
    });
  }

  updateMessage(messageId: number, updatedMessage: Message) {
    return this.update(messageId, updatedMessage).then(() =>
      this.findOne(messageId)
    );
  }

  deleteMessage(messageId: number) {
    return this.findOne(messageId).then(message => {
      return this.delete(messageId).then(() => message);
    });
  }
}
