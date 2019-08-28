import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createConnection } from 'typeorm';
import { AppModule } from './app.module';
import { AppConfig } from './shared/config/config';

async function bootstrap() {
  // await createConnection();

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Confi')
    .setDescription('Confi API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(AppConfig.appPort);

  console.log(`Listening at ${AppConfig.appPort}`);
}

bootstrap();
