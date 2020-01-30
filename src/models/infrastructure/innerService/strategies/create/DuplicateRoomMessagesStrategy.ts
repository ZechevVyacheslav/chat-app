import IAddingStrategy from '../../../../../Patterns/strategy/IAddingStrategy';

export default class DuplicateRoomMessagesStrategy implements IAddingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  add(args) {
    const { originalRoomId, duplicatedRommId } = args;
    const messages = this.repository.getMessagesByRoomId(originalRoomId);
    const savedMessages = messages
      .then(fetchedMessages => {
        const copiedMessages = fetchedMessages.map(message => {
          const roomCopy = { ...message.room, id: duplicatedRommId };
          roomCopy.__proto__ = Object.create(
            Object.getPrototypeOf(message.room)
          );
          const messageCopy = { ...message, id: null, room: roomCopy };
          messageCopy.__proto__ = Object.create(Object.getPrototypeOf(message));
          return messageCopy;
        });
        return copiedMessages;
      })
      .then(copiedMessages => {
        const savedMessages = copiedMessages.map(message => {
          return this.repository.addMessage(message);
        });
        return Promise.all(savedMessages);
      });

    return savedMessages;
  }
}
