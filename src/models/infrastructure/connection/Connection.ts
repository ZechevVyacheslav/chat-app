import { createConnection } from 'typeorm';
import User from '../../domain/core/User';
import Room from '../../domain/core/Room';
import Message from '../../domain/core/Message';
import Role from '../../domain/core/Role';

// const connection = createConnection({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'password123',
//   database: 'test',
//   entities: [User, Room, Message, Role],
//   synchronize: true,
//   logging: false
// });

export default class Connection {
  private static instance: Connection;
  private connection;

  private constructor() {
    this.connection = createConnection({
      type: 'postgres',
      url:
        'postgres://xhalvaus:RvJV290LAreB9PoRWgLshtKWgsryxWXT@balarama.db.elephantsql.com:5432/xhalvaus',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'password123',
      // database: 'test',
      entities: [User, Room, Message, Role],
      synchronize: true,
      logging: false
    });
  }

  public static getInstance(): Connection {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }
    return Connection.instance;
  }

  public getConnection() {
    return this.connection;
  }
}
