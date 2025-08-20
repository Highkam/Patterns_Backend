import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Activa la validación global para los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true,   // lanza error si envías props extra
      transform: true,              // convierte automáticamente tipos (ej. string a number en @Param)
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 App corriendo en http://localhost:${port}`);
}
bootstrap();
