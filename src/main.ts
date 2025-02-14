import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  // Enable CORS for frontend communication
  app.enableCors();

  // Global validation pipes (optional but recommended for DTO validation)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
  console.log('Server is running on http://localhost:3001');
}
bootstrap();
