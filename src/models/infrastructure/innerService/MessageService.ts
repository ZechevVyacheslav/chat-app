import IMessageRepository from '../../domain/interfaces/IMessageRepository';
import IMessageService from '../../services/interfaces/IMessageService';
import Message from '../../domain/core/Message';

import BaseService from './BaseService';

import AddMessageStrategy from './strategies/create/AddMessageStrategy';
import FindMessageByIdStrategy from './strategies/read/FindMessageByIdStrategy';
import FindMessageByRoomIdStrategy from './strategies/read/FindMessageByRoomIdStrategy';
import UpdateMessageStrategy from './strategies/update/UpdateMessageStrategy';
import DeleteMessageStrategy from './strategies/delete/DeleteMessageStrategy';
import DuplicateRoomMessagesStrategy from './strategies/create/DuplicateRoomMessagesStrategy';

export default class MessageService extends BaseService
  implements IMessageService {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    super();
    this.messageRepository = messageRepository;
  }

  addMessage(message: Message) {
    this.invoker.changeAddingStragegy(
      new AddMessageStrategy(this.messageRepository)
    );
    return this.addingStrategy.add(message);
  }

  getMessageById(messageId: number) {
    this.invoker.changeSearchingStrategy(
      new FindMessageByIdStrategy(this.messageRepository)
    );
    return this.searchingStrategy.find(messageId);
  }

  getMessagesByRoomId(roomId: number) {
    this.invoker.changeSearchingStrategy(
      new FindMessageByRoomIdStrategy(this.messageRepository)
    );
    return this.searchingStrategy.find(roomId);
  }

  updateMessage(messageId: number, updatedMessage: Message) {
    this.invoker.changeUpdatingStrategy(
      new UpdateMessageStrategy(this.messageRepository)
    );
    return this.updatingStrategy.update(messageId, updatedMessage);
  }

  deleteMessage(messageId: number) {
    this.invoker.changeDeletingStrategy(
      new DeleteMessageStrategy(this.messageRepository)
    );
    return this.deletingStrategy.delete(messageId);
  }

  duplicateMessagesByRoomId(originalRoomId: number, duplicatedRommId: number) {
    this.invoker.changeAddingStragegy(
      new DuplicateRoomMessagesStrategy(this.messageRepository)
    );
    return this.addingStrategy.add({originalRoomId, duplicatedRommId});
  }
}
