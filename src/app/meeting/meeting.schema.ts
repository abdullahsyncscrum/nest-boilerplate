// src/meeting/schemas/meeting.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeetingDocument = Meeting & Document;

@Schema({ timestamps: true })
export class Meeting {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: number; // in minutes

  @Prop({ required: true, unique: true })
  roomName: string;

  @Prop({ required: true })
  createdBy: string; // Later can be Coach ID

  @Prop({ default: 'scheduled' })
  status: string; // scheduled, ongoing, completed
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
