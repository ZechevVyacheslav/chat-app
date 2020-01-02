import Message from '../../domain/core/Message';
// import { User } from '../../domain/core/User';

export default interface IMessageService {
    addMessage(message: Message): Promise<Message>;
    getMessagesByRoomId(roomId: number): Promise<Message[]>;
}