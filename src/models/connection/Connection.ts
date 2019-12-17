import { createConnection } from 'typeorm';
import { User } from '../entity/User';

export const connection = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password123',
  database: 'test',
  entities: [User],
  synchronize: true,
  logging: false
});
