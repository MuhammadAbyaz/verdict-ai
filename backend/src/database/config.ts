import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config({ path: '.env' });

const configService = new ConfigService();
const migrationsPath = __dirname + '/migrations/**/*.{js,ts}';
const entitiesPath = __dirname + '/../modules/**/entities/*.entity.{js,ts}';

export const dataSourceOptions = {
  url: configService.get('DB_URL'),
  migrations: [migrationsPath],
  migrationsTableName: 'migrations',
  database: configService.get('DB'),
  type: 'postgres',
  entities: [entitiesPath],
  ssl: { rejectUnauthorized: false },
  synchronize: false,
} as TypeOrmModuleOptions;

export default new DataSource(dataSourceOptions as DataSourceOptions);
