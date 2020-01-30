import ISearchingStrategy from '../../../../../Patterns/strategy/ISearchingStrategy';

export default class FindRoomByUserIdStrategy implements ISearchingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  find(creatorId: number) {
    return this.repository.findRoomsByCreatorId(creatorId);
  }
}
