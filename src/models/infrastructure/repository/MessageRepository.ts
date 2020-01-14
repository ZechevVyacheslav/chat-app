import { EntityRepository, Repository } from 'typeorm';
import IMessageRepository from '../../domain/interfaces/IMessageRepository';
import Message from '../../domain/core/Message';
import User from '../../domain/core/User';

const cutUserPasswordFromMessage = (message: Message) => {
  const userWithoutPassword = new User();
  userWithoutPassword.id = message.user.id;
  userWithoutPassword.username = message.user.username;
  userWithoutPassword.email = message.user.email;

  const updatedMessage = new Message();
  updatedMessage.id = message.id;
  updatedMessage.text = message.text;
  updatedMessage.room = message.room;
  updatedMessage.user = userWithoutPassword;
  return updatedMessage;
};

@EntityRepository(Message)
export default class MessageRepositroy extends Repository<Message>
  implements IMessageRepository {
  addMessage(message: Message) {
    return this.save(message)
      .then(savedMessage => {
        return this.findOne(savedMessage.id, { relations: ['room', 'user'] });
      })
      .then(populatedMessage => cutUserPasswordFromMessage(populatedMessage));
  }

  getMessageById(messageId: number) {
    return this.findOne(messageId);
  }

  getMessagesByRoomId(roomId: number) {
    return this.find({ relations: ['room', 'user'] }).then(messages => {
      const filteredMessages = messages.filter(
        message => message.room.id === roomId
      );
      return filteredMessages.map(message => {
        return cutUserPasswordFromMessage(message);
      });
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
