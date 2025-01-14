import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationModule } from './core/swagger/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerDocumentationModule.setup(app);

  await app.listen(process.env.PORT);
}
bootstrap();
