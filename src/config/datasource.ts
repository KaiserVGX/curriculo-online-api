import { join } from 'node:path';
import { DataSourceOptions } from 'typeorm';


export function databaseOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      join(__dirname, '..', 'modules', '**','*.model{.ts,.js}'),
    ],
    migrations: [
  join(__dirname, '..', 'migrations', '*{.ts,.js}'),
],
    migrationsRun: true,
};
}