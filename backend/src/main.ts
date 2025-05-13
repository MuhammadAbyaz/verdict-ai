import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Enable CORS if needed
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');

  await app.init();
}

bootstrap();

// Export for serverless use
export default server;
