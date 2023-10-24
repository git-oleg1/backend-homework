import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { UserModule } from './user/user.module';

function setupSwager(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('YouCube project')
    .setDescription('The YouCube API')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: [UserModule],
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  setupSwager(app);
  await app.listen(3000);
}
bootstrap();
