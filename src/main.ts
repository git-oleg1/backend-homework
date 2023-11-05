import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './role/roles.guard';

function setupSwager(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('YouCube project')
    .setDescription('The YouCube API')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: [UserModule, RoleModule, AuthModule],
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  setupSwager(app);
  await app.listen(3000);
}
bootstrap();
