import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { TempModule } from './app/temp/temp.module';
import { SharedModule } from './shared/shared.module';
import { MeetingModule } from './app/meeting/meeting.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    TempModule,
    SharedModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
