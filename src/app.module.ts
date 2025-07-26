import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { TempModule } from './app/temp/temp.module';

@Module({
  imports: [ConfigModule, DatabaseModule, TempModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
