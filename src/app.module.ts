import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import weatherConfig from './config/weather.config';

@Module({
  imports: [
    WeatherModule,
    ConfigModule.forRoot({ isGlobal: true, load: [weatherConfig] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
