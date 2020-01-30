import ICommand from '../../../../Patterns/ICommand';
import BaseService from '../BaseService';
import IAddingStrategy from '../../../../Patterns/strategy/IAddingStrategy';

export default class ChangeAddingStrategyCommand implements ICommand {
  private baseService: BaseService;
  private strategy: IAddingStrategy;

  constructor(baseService: BaseService, strategy: IAddingStrategy) {
    this.baseService = baseService;
    this.strategy = strategy;
  }

  execute() {
    this.baseService.setAddingStrategy(this.strategy);
  }
}
