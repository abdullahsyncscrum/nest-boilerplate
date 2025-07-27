import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config';
import { TwilioVideoService } from './services/twilio';

@Module({
  imports: [ConfigModule],
  providers: [TwilioVideoService],
  exports: [TwilioVideoService],
})
export class SharedModule {}
