import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseProvider } from './database.provider';

@Global()
@Module({
  providers: [DatabaseService],
  imports: [...DatabaseProvider],
  exports: [...DatabaseProvider, DatabaseService],
})
export class DatabaseModule {}
