/* eslint-disable @typescript-eslint/no-floating-promises */
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos extra que no estén en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan campos inesperados
      transform: true, // transforma payload a instancias de DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
