import IAddingStrategy from '../../../../../Patterns/strategy/IAddingStrategy';

export default class DuplicateRoomStrategy implements IAddingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  add(roomId) {
    const originalRoom = this.repository.findRoomById(roomId);
    const duplicatedRoom = originalRoom.then(room => {
      const copy = { ...room, id: null, title: `${room.title} - copy` };
      copy.__proto__ = Object.create(Object.getPrototypeOf(room));
      return this.repository.addRoom(copy);
    });
    return duplicatedRoom;
  }
}
