import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as path from 'path'

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Configurar CORS basado en variables de entorno
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // Usa el valor de CORS_ORIGIN o permite todos en caso de no estar definido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  };
  app.enableCors(corsOptions)

  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // Configurar Swagger solo si no estamos en producción
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Titulo del API')
      .setDescription(
        'Versión del API'
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)
  }

  // Iniciar la aplicación
  // await app.listen(process.env.PORT ?? 8000);
  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');
}
bootstrap();
