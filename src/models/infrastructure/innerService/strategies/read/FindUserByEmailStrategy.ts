import ISearchingStrategy from '../../../../../Patterns/strategy/ISearchingStrategy';

export default class FindRoomByEmailStrategy implements ISearchingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  find(email: number) {
    return this.repository.findUserByEmail(email);
  }
}