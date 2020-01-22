import ISearchingStrategy from '../../../../../Patterns/strategy/ISearchingStrategy';

export default class FindRoomByIdStrategy implements ISearchingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  find(roomId: number) {
    return this.repository.findRoomById(roomId);
  }
}
