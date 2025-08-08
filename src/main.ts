import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from './config';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';
import { DeploymentEnvironmentTypes } from './shared/enums/deployment-environment-types.enum';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  // Global prefix for API versioning ->>> It like /v1
  // app.setGlobalPrefix(configService.getGlobalAPIPrefix());

  // Configuration for the size of the payload coming from FE
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));

  // Enable cors
  app.enableCors({ origin: 'http://localhost:5173', credentials: true });

  // Apply global pipe for incoming data validation
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages:
        configService.getEnvironment() ===
        DeploymentEnvironmentTypes.Production,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  await app.listen(8000);
}
bootstrap();
