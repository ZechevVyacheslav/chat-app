import ICommand from '../../../../Patterns/ICommand';
import BaseService from '../BaseService';
import ISearchingStrategy from '../../../../Patterns/strategy/ISearchingStrategy';

export default class ChangeSearchingStrategyCommand implements ICommand {
  private baseService: BaseService;
  private strategy: ISearchingStrategy;

  constructor(baseService: BaseService, strategy: ISearchingStrategy) {
    this.baseService = baseService;
    this.strategy = strategy;
  }

  execute() {
    this.baseService.setSearchingStrategy(this.strategy);
  }
}
