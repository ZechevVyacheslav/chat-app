import ISearchingStrategy from '../../../../../Patterns/strategy/ISearchingStrategy';

export default class FindMessageByIdStrategy implements ISearchingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  find(id: number) {
    return this.repository.getMessageById(id);
  }
}
