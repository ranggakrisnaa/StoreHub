import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { ApiKeyGuard } from './api-key/api-key.middleware';

const server = express();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    const { httpAdapter } = app.get(HttpAdapterHost);

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
    app.useGlobalGuards(new ApiKeyGuard());

    app.enableCors();
    await app.listen(3000);
}

bootstrap();
export default server;
