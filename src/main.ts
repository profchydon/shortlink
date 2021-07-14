import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Enable validation pipe
      whitelist: true, // Stripping undefined properties from dto's
      transform: true, // Transform the dto fields to defined datatypes
    }),
  );
  await app.listen(3000);
}
bootstrap();
