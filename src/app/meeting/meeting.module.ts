// src/meeting/meeting.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingController } from './meeting.controller';
import { Meeting, MeetingSchema } from './meeting.schema';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
    SharedModule,
  ],
  controllers: [MeetingController],
})
export class MeetingModule {}
