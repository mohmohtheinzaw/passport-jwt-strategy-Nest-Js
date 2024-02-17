import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('NestJS Book-Store management(e-commerce) API')
  .setDescription('The API for the NestJS book store management project')
  .setVersion('1.0')
  .addBearerAuth()
  .build();