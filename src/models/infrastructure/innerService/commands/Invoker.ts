import BaseService from '../BaseService';
import ChangeAddingStrategyCommand from './ChangeAddingStrategyCommand';
import ICommand from '../../../../Patterns/ICommand';
import IAddingStrategy from '../../../../Patterns/strategy/IAddingStrategy';
import ISearchingStrategy from '../../../../Patterns/strategy/ISearchingStrategy';
import IUpdatingStrategy from '../../../../Patterns/strategy/IUpdatingStrategy';
import IDeletingStrategy from '../../../../Patterns/strategy/IDeletingStrategy';
import ChangeSearchingStrategyCommand from './ChangeSearchingStrategyCommand';
import ChangeUpdatingStrategyCommand from './ChangeUpdatingStrategyCommand';
import ChangeDeletingStrategyCommand from './ChangeDeletingStrategyCommand';

export default class Invoker {
  private baseService: BaseService;
  private currentCommand: ICommand;

  constructor(baseService: BaseService) {
    this.baseService = baseService;
  }

  setCommand(command: ICommand) {
    this.currentCommand = command;
  }

  changeAddingStragegy(addingStrategy: IAddingStrategy) {
    this.setCommand(
      new ChangeAddingStrategyCommand(this.baseService, addingStrategy)
    );
    console.log('Changing adding strategy');
    this.currentCommand.execute();
  }

  changeSearchingStrategy(searchingStrategy: ISearchingStrategy) {
    this.setCommand(
      new ChangeSearchingStrategyCommand(this.baseService, searchingStrategy)
    );
    console.log('Changing searching strategy');
    this.currentCommand.execute();
  }

  changeUpdatingStrategy(updatingStrategy: IUpdatingStrategy) {
    this.setCommand(
      new ChangeUpdatingStrategyCommand(this.baseService, updatingStrategy)
    );
    console.log('Changing updating strategy');
    this.currentCommand.execute();
  }

  changeDeletingStrategy(deletingStrategy: IDeletingStrategy) {
    this.setCommand(
      new ChangeDeletingStrategyCommand(this.baseService, deletingStrategy)
    );
    console.log('Changing deleting strategy');
    this.currentCommand.execute();
  }
}
