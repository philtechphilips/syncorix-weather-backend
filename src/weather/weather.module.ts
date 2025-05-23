import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { WeatherApiService } from './weather-api.service';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherApiService],
  exports: [WeatherService],
})
export class WeatherModule {}
