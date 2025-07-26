import { Module } from '@nestjs/common';
import { TempService } from './temp.service';
import { TempController } from './temp.controller';
import { ConfigModule } from 'src/config';

@Module({
  imports: [ConfigModule],
  providers: [TempService],
  controllers: [TempController],
})
export class TempModule {}
