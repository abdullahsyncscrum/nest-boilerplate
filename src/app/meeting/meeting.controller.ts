// src/meeting/meeting.controller.ts
import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from './meeting.schema';
import { TwilioVideoService } from 'src/shared/services/twilio';

@Controller('meeting')
export class MeetingController {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
    private readonly twilioVideoService: TwilioVideoService,
  ) {}

  @Post('create')
  async createMeeting(
    @Body() body: { title: string; duration: number; createdBy: string },
  ) {
    const roomName = Math.random().toString(36).substring(2, 8);

    // Create room in Twilio
    await this.twilioVideoService.getOrCreateRoom(
      roomName,
      20, // you could set body.maxParticipants here
      body.duration * 60, // convert minutes to seconds
    );

    // Save in DB
    const meeting = await this.meetingModel.create({
      title: body.title,
      duration: body.duration,
      createdBy: body.createdBy || 'coach1', // mock for now
      roomName,
    });

    return {
      meetingId: meeting._id,
      meetingLink: `http://localhost:5173/join/${meeting._id}`,
      roomName,
    };
  }

  @Post('join')
  async joinMeeting(@Body() body: { meetingId: string; name: string }) {
    const meeting = await this.meetingModel.findById(body.meetingId);
    if (!meeting) throw new BadRequestException('Meeting not found');

    // Generate Twilio token
    const token = this.twilioVideoService.generateToken(
      body.name,
      meeting.roomName,
    );

    return {
      token,
      roomName: meeting.roomName,
    };
  }
}
