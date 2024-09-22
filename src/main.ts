import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(passport.initialize());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Backend Login Signup | NestJS')
    .setDescription('Backend Login Signup | NestJS')
    .setVersion('1.0')
    .addTag('Auth') // Add tags for grouping
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // document.components = null;
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.NODE_DOCKER_PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
