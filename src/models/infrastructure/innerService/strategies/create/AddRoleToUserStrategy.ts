import IAddingStrategy from '../../../../../Patterns/strategy/IAddingStrategy';

export default class AddRoleToUserStrategy implements IAddingStrategy {
  private repository;
  constructor(repository) {
    this.repository = repository;
  }
  add(args) {
    const { role, user } = args;
    return this.repository.assignRoleToUser(role, user);
  }
}
