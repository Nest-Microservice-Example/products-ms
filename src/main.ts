import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
});

async function bootstrap() {
  const logger = new Logger(AppModule.name);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(validationPipe);

  await app.listen(AppModule.PORT);

  logger.log(`App running on port ${AppModule.PORT}`);
}

bootstrap();
