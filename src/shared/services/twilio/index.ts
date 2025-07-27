import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { ConfigService } from 'src/config';
import AccessToken from 'twilio/lib/jwt/AccessToken';

const { VideoGrant } = AccessToken;

@Injectable()
export class TwilioVideoService {
  constructor(
    private readonly twilio: TwilioService,
    private readonly configService: ConfigService,
  ) {}

  async createRoom(uniqueName: string) {
    return await this.twilio.client.video.v1.rooms.create({
      uniqueName,
      type: 'group',
      maxParticipants: 20,
      //   statusCallback: `${process.env.API_URL}/webhooks/twilio/room`, // It is the url of webhook: when any event is happend this url is call like recordingg start, participant join, etc
      //   statusCallbackMethod: 'POST',
      emptyRoomTimeout: 10,
      maxParticipantDuration: 60 * 60,
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
