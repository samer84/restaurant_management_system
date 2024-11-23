/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 // Register global filters
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT ?? 3000;
  console.log(`Application will listen on port: ${port}`);
  await app.listen(port);
}
bootstrap();
