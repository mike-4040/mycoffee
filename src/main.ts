import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalInterceptors(new WrapResponseInterceptor());
  await app.listen(PORT);
  console.log(`The app is running at http://www.localhost:${PORT}`);
}
bootstrap();
