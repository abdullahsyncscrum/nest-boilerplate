import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { ENTITIES } from './entities';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  entities: ENTITIES,
  synchronize: false,
};

export default databaseConfig;
