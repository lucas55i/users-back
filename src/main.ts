import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { setupDatabase } from './config/setupDataBase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Crud example')
    .setDescription('The Crud API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;

  app.enableCors();
  await app.listen(port).then(() => {
    setupDatabase();
    Logger.log(`Nest rodando na porta: ${port}`);
  });
}
bootstrap();
