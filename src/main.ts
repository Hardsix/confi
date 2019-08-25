import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './shared/config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AppConfig.appPort);
}

bootstrap();
