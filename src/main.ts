import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
 
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AccessTokenGuard } from './auth/guard/access-token.guard';
import { ValidationPipe } from './pipes/validation.pipe';
import { HttpExceptionFilter } from './global-filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './global-filters/all-exceptions.filter';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PostGuard } from './auth/guard/post.guard';
import { EmployeeIdInQuery } from './chats/guard/employee-id-in-query.guard';
// import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const PORT = process.env.APP_PORT || 5000 

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors( {
    credentials: true,  
    origin: ['http://localhost:5173']
  })
 
  const config = new DocumentBuilder()
    .setTitle('Проект nestjs')
    .setDescription('Документация  REST API')
    .setVersion('1.0.0')
    .addTag('V1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const configServise = app.get(ConfigService)
  const hhtpAdapterHost = app.get(HttpAdapterHost) 

  app.useGlobalGuards(
    new JwtAuthGuard(new JwtService(), configServise, new Reflector()),
    new PostGuard(new Reflector()),
    // new EmployeeIdInQuery(),
  )
  app.useGlobalPipes(new ValidationPipe()) 
  app.useGlobalFilters(
    new HttpExceptionFilter(configServise),
    new AllExceptionsFilter(hhtpAdapterHost),
  )

  await app.listen(PORT, () => console.log(`Сервер стартовал на порту ${PORT}`))
}
bootstrap();
