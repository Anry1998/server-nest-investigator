import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const PORT = process.env.APP_PORT || 5000 

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors( {
    credentials: true,  
    origin: ['*']
  })

  const config = new DocumentBuilder()
    .setTitle('Проект nestjs')
    .setDescription('Документация  REST API')
    .setVersion('1.0.0')
    .addTag('V1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(PORT, () => console.log(`Сервер стартовал на порту ${PORT}`))
}
bootstrap();
