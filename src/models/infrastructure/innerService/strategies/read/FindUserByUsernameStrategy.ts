import ISearchingStrategy from '../../../../../Patterns/strategy/ISearchingStrategy';

export default class FindUserByUsernameStrategy implements ISearchingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  find(username: string) {
    return this.repository.findUserByUsername(username)
  }
}
