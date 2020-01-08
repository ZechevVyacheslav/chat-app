import Message from '../../domain/core/Message';

export default interface IMessageService {
  addMessage(message: Message): Promise<Message>;
  getMessageById(messageId: number): Promise<Message>;
  getMessagesByRoomId(roomId: number): Promise<Message[]>;
  updateMessage(messageId: number, updatedMessage: Message): Promise<Message>;
  deleteMessage(messageId: number): Promise<Message>;
}
