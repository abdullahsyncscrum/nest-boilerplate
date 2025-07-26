import { Controller, Get } from '@nestjs/common';
import { ConfigService } from 'src/config';

@Controller('temp')
export class TempController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getEnvVariables() {
    return {
      baseUrl: this.configService.getBaseUrl(),
      frontendUrl: this.configService.getFrontendUrl(),
    };
  }
}
