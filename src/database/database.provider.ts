import {
  MongooseModule,
  MongooseModuleAsyncOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import databaseConfig from './database.config';

export const mongooseAsyncConfig: MongooseModuleAsyncOptions = {
  useFactory: async (): Promise<MongooseModuleOptions> => {
    return databaseConfig;
  },
};

export const DatabaseProvider = [
  MongooseModule.forRootAsync(mongooseAsyncConfig),
];
