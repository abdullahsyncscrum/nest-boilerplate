import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { ConfigService } from 'src/config';
import { VideoGrant } from 'twilio/lib/jwt/AccessToken';
import { jwt } from 'twilio';
const { AccessToken } = jwt;

@Injectable()
export class TwilioVideoService {
  constructor(
    private readonly twilio: TwilioService,
    private readonly configService: ConfigService,
  ) {}

  async getOrCreateRoom(
    uniqueName: string,
    maxParticipants?: number,
    maxDurationSec?: number,
  ) {
    try {
      const existingRoom = await this.twilio.client.video.v1
        .rooms(uniqueName)
        .fetch();
      if (existingRoom && existingRoom.status !== 'completed') {
        return existingRoom;
      }
    } catch (error) {}

    return await this.twilio.client.video.v1.rooms.create({
      uniqueName,
      type: 'group',
      maxParticipants: maxParticipants ?? undefined,
      emptyRoomTimeout: 10,
      maxParticipantDuration: maxDurationSec ?? undefined,
      recordParticipantsOnConnect: true,
    });
  }

  generateToken(identity: string, room: string, ttlSec = 3600) {
    const token = new AccessToken(
      this.configService.getTwilioAccoundSid(),
      this.configService.getTwilioApiKey(),
      this.configService.getTwilioSecretKey(),
      { identity, ttl: ttlSec },
    );
    token.addGrant(new VideoGrant({ room }));
    return token.toJwt();
  }
}
