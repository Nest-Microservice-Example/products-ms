import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from './config';

const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
});

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);

  const config = context.get(ConfigService);

  const logger = new Logger(AppModule.name);

  const PORT = config.get<number>(ConfigEnum.PORT);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT,
      },
    },
  );

  app.useGlobalPipes(validationPipe);

  await app.listen();

  logger.log(`Products Microservice running on port ${PORT}`);
}

bootstrap();
