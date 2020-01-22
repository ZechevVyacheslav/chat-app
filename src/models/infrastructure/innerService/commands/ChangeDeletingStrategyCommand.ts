import ICommand from '../../../../Patterns/ICommand';
import BaseService from '../BaseService';
import IDeletingStrategy from '../../../../Patterns/strategy/IDeletingStrategy';

export default class ChangeDeletingStrategyCommand implements ICommand {
  private baseService: BaseService;
  private strategy: IDeletingStrategy;

  constructor(baseService: BaseService, strategy: IDeletingStrategy) {
    this.baseService = baseService;
    this.strategy = strategy;
  }

  execute() {
    this.baseService.setDeletingStrategy(this.strategy);
  }
}
