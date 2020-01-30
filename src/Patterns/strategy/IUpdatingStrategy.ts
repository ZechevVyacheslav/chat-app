export default interface IUpdatingStrategy {
    update(oldEntity: any, newEntity: any): any;
}