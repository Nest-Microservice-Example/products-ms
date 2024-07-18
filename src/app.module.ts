import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
