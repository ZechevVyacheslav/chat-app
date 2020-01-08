import IMessageService from '../../services/interfaces/IMessageService';
import IMessageRepository from '../../domain/interfaces/IMessageRepository';
import Message from '../../domain/core/Message';

export default class MessageService implements IMessageService {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  addMessage(message: Message) {
    return this.messageRepository.addMessage(message);
  }

  getMessageById(messageId: number) {
    return this.messageRepository.getMessageById(messageId);
  }

  getMessagesByRoomId(roomId: number) {
    return this.messageRepository.getMessagesByRoomId(roomId);
  }

  updateMessage(messageId: number, updatedMessage: Message) {
    return this.messageRepository.updateMessage(messageId, updatedMessage);
  }

  deleteMessage(messageId: number) {
    return this.messageRepository.deleteMessage(messageId);
  }
}
