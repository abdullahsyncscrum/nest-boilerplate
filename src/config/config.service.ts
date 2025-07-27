import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';

import { IEnvSchema } from 'src/shared/interfaces/env-schema.interface';
import { DeploymentEnvironmentTypes } from 'src/shared/enums/deployment-environment-types.enum';

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvSchema;

  constructor() {
    dotenv.config();
    this.envConfig = this.validateEnvSchema(process.env);
  }

  private getEnvSchema() {
    const schema = Joi.object<IEnvSchema>({
      BASE_URL: Joi.string().uri().required(),
      NODE_ENV: Joi.string()
        .valid(...Object.values(DeploymentEnvironmentTypes))
        .default(DeploymentEnvironmentTypes.Development),
      PORT: Joi.number().port().required(),
      DB_USERNAME: Joi.string().trim().min(1).required(),
      DB_PASSWORD: Joi.string().trim().min(1).required(),
      DB_NAME: Joi.string().trim().min(1).required(),
      DB_HOST: Joi.string().trim().min(1).required(),
      DB_PORT: Joi.number().port().required(),
      TWILIO_ACCOUNT_SID: Joi.string().trim().min(1).required(),
      TWILIO_API_KEY: Joi.string().trim().min(1).required(),
      TWILIO_API_SECRET: Joi.string().trim().min(1).required(),
    });
    return schema;
  }

  private validateEnvSchema(keyValuePairs) {
    const envSchema = this.getEnvSchema();
    const validationResult = envSchema.validate(keyValuePairs, {
      allowUnknown: true,
    });

    if (validationResult.error) {
      throw new Error(
        `Validation failed for .env file. ${validationResult.error.message}.`,
      );
    }

    return validationResult.value;
  }

  private get(key: string): string {
    return this.envConfig[key];
  }

  getBaseUrl() {
    return this.get('BASE_URL');
  }

  getEnvironment() {
    return this.get('NODE_ENV');
  }

  getPort() {
    return this.get('PORT');
  }

  getDBUsername() {
    return this.get('DB_USERNAME');
  }

  getDBPassword() {
    return this.get('DB_PASSWORD');
  }

  getDBName() {
    return this.get('DB_NAME');
  }

  getDBHost() {
    return this.get('DB_HOST');
  }

  getDBPort() {
    return this.get('DB_PORT');
  }

  getTwilioAccoundSid() {
    return this.get('TWILIO_ACCOUNT_SID');
  }

  getTwilioApiKey() {
    return this.get('TWILIO_API_KEY');
  }

  getTwilioSecretKey() {
    return this.get('TWILIO_API_SECRET');
  }
}
