import IMessageRepository from '../../domain/interfaces/IMessageRepository';
import IAddingStrategy from '../../../Patterns/strategy/IAddingStrategy';
import ISearchingStrategy from '../../../Patterns/strategy/ISearchingStrategy';
import IUpdatingStrategy from '../../../Patterns/strategy/IUpdatingStrategy';
import IDeletingStrategy from '../../../Patterns/strategy/IDeletingStrategy';

import Invoker from './commands/Invoker'

export default class BaseService {
  protected addingStrategy: IAddingStrategy;
  protected searchingStrategy: ISearchingStrategy;
  protected updatingStrategy: IUpdatingStrategy;
  protected deletingStrategy: IDeletingStrategy;
  protected invoker: Invoker;

  constructor() {
    this.invoker = new Invoker(this);
  }

  public setAddingStrategy(strategy: IAddingStrategy) {
      this.addingStrategy = strategy;
  }

  public setSearchingStrategy(strategy: ISearchingStrategy) {
      this.searchingStrategy = strategy;
  }

  public setUpdatingStrategy(strategy: IUpdatingStrategy) {
      this.updatingStrategy = strategy;
  }

  public setDeletingStrategy(strategy: IDeletingStrategy) {
      this.deletingStrategy = strategy;
  }




}
