import Message from '../core/Message';

export default interface IMessageRepository {
  addMessage(message: Message): Promise<Message>;
  getMessageById(messageId: number): Promise<Message>;
  getMessagesByRoomId(roomId: number): Promise<Message[]>;
  updateMessage(messageId: number, updatedMessage: Message): Promise<Message>;
  deleteMessage(messageId: number): Promise<Message>;  
}
