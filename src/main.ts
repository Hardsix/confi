import { NestFactory } from '@nestjs/core';
import { createConnection } from 'typeorm';
import { AppModule } from './app.module';
import { AppConfig } from './shared/config/config';

async function bootstrap() {
  // await createConnection({
  //   username: 'postgres',
  //   password: AppConfig.dbPassword,
  //   host: AppConfig.dbHost,
  //   port: AppConfig.dbPort,
  //   database: AppConfig.dbName,
  //   name: 'default',
  //   type: 'postgres',
  // });
  await createConnection();

  const app = await NestFactory.create(AppModule);
  await app.listen(AppConfig.appPort);
}

bootstrap();
