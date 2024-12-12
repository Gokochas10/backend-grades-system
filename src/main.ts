import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permite todas las solicitudes de cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept', // Cabeceras permitidas
    credentials: true, // Permitir el uso de credenciales (cookies, cabeceras de autenticación)
  });

  await app.listen(3000);
  
}

bootstrap();
