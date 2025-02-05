import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProductModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
