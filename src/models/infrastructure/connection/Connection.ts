import { createConnection } from 'typeorm';
import User from '../../domain/core/User';
import Room from '../../domain/core/Room';
import Message from '../../domain/core/Message';
import Role from '../../domain/core/Role';

export const connection = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password123',
  database: 'test',
  entities: [User, Room, Message, Role],
  synchronize: true,
  logging: false
});
