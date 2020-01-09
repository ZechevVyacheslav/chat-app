import User from '../core/User';

export default interface IUserRepository {
  findUserById(id: number): Promise<User>;
  findUserByUsername(username: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  addUser(user: User): Promise<User>;
}
