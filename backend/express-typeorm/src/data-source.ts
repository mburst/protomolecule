import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'test.db',
  synchronize: true,
  logging: true,
  entities: ['dist/entity/*.{js, ts}'],
  migrations: [],
  subscribers: [],
});
