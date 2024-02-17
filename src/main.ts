import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { Prisma, PrismaClient } from '@prisma/client';
import { swaggerOptions } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.use(morgan('dev'));
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     transformOptions: { enableImplicitConversion: true },
  //     forbidNonWhitelisted: true,
  //   }),
  // );
  const prefix = 'api'
  app.setGlobalPrefix(prefix);
  app.enableCors({
    origin: '*',
  });
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();

