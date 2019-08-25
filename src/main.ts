import { NestFactory } from '@nestjs/core';
import { createConnection } from 'typeorm';
import { AppModule } from './app.module';
import { AppConfig } from './shared/config/config';

async function bootstrap() {
  await createConnection();

  const app = await NestFactory.create(AppModule);
  await app.listen(AppConfig.appPort);
}

bootstrap();
