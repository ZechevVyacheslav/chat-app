import ISearchingStrategy from '../../../../../Patterns/strategy/ISearchingStrategy';

export default class FindRoleByTitleStrategy implements ISearchingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  find(title: string) {
    return this.repository.findRoleByTitle(title);
  }
}
