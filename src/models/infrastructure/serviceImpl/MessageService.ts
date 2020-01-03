import IMessageService from '../../services/interfaces/IMessageService';
import IMessageRepository from '../../domain/interfaces/IMessageRepository';
import Message from '../../domain/core/Message';
// import { User } from '../../domain/core/User';

export default class MessageService implements IMessageService {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  addMessage(message: Message) {
    return this.messageRepository.addMessage(message);
  }

  getMessagesByRoomId(roomId: number) {
    return this.messageRepository.getMessagesByRoomId(roomId);
  }
}
