import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config, { ApiConfig, ConfigEnum } from './config';

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
  public static PORT: number;

  constructor(private readonly _config: ConfigService) {
    const app = this._config.get<ApiConfig>(ConfigEnum.API);

    AppModule.PORT = app.port;
  }
}
