import ICommand from '../../../../Patterns/ICommand';
import BaseService from '../BaseService';
import IUpdatingStrategy from '../../../../Patterns/strategy/IUpdatingStrategy';

export default class ChangeUpdatingStrategyCommand implements ICommand {
  private baseService: BaseService;
  private strategy: IUpdatingStrategy;

  constructor(baseService: BaseService, strategy: IUpdatingStrategy) {
    this.baseService = baseService;
    this.strategy = strategy;
  }

  execute() {
    this.baseService.setUpdatingStrategy(this.strategy);
  }
}
