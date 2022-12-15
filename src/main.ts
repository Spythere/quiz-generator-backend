import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const whitelist = ['http://localhost:3000', 'http://example2.com'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) return callback(null, true);

      callback(new Error('Not allowed by CORS'));
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Quiz Generator API')
    .setDescription('Usługi backendowe generatora quizów')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
