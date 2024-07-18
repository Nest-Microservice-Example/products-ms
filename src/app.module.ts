import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
