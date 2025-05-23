import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import weatherConfig from './config/weather.config';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    WeatherModule,
    AiModule,
    ConfigModule.forRoot({ isGlobal: true, load: [weatherConfig] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
