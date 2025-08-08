import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'src/config';
import { TwilioVideoService } from './services/twilio';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        accountSid: configService.getTwilioAccoundSid(),
        authToken: configService.getTwilioAuthToken(),
      }),
    }),
    ConfigModule,
  ],
  providers: [TwilioVideoService],
  exports: [TwilioVideoService],
})
export class SharedModule {}
