import { Injectable } from '@nestjs/common';
import { WeatherApiService, NormalizedWeather } from './weather-api.service';

@Injectable()
export class WeatherService {
  constructor(private weatherApiService: WeatherApiService) {}

  async getPopularCitiesWeather(): Promise<NormalizedWeather[]> {
    const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Lagos', 'Moscow', 'Rio de Janeiro', 'Cairo', 'Beijing'];
    const results = await Promise.all(
      cities.map(city => this.weatherApiService.getWeatherByCity(city))
    );
    return results;
  }

  async getWeatherByCity(city: string): Promise<NormalizedWeather> {
    return this.weatherApiService.getWeatherByCity(city);
  }

  async getWeatherByCityAndDate(city: string, date: string): Promise<NormalizedWeather> {
    return this.weatherApiService.getWeatherByCityAndDate(city, date);
  }
}
