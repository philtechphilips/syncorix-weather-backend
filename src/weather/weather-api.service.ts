import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export interface NormalizedWeather {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
}

@Injectable()
export class WeatherApiService {
  constructor(private configService: ConfigService, private httpService: HttpService) {}

  async getWeatherByCity(city: string): Promise<NormalizedWeather> {
    const apiKey = this.configService.get<string>('weather.openWeatherApiKey');
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
    try {
      const { data } = await this.httpService.axiosRef.get(url);
      return {
        city: data.location?.name || city,
        temperature: data.current?.temp_c,
        description: data.current?.condition?.text,
        humidity: data.current?.humidity,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error.response && error.response.status === 400) {
        throw new NotFoundException('City not found');
      }
      throw new HttpException('Failed to fetch weather data', 500);
    }
  }

  async getWeatherByCityAndDate(city: string, date: string): Promise<NormalizedWeather> {
    const apiKey = this.configService.get<string>('weather.openWeatherApiKey');
    // Use forecast for today/tomorrow, history for yesterday
    const today = new Date().toISOString().split('T')[0];
    const endpoint =
      date < today
        ? `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${encodeURIComponent(city)}&dt=${date}`
        : `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&dt=${date}`;
    try {
      const { data } = await this.httpService.axiosRef.get(endpoint);
      // For history, use data.forecast.forecastday[0].day
      // For forecast, use data.forecast.forecastday[0].day
      const forecastDay = data.forecast?.forecastday?.[0]?.day;
      return {
        city: data.location?.name || city,
        temperature: forecastDay?.avgtemp_c,
        description: forecastDay?.condition?.text,
        humidity: forecastDay?.avghumidity,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error.response && error.response.status === 400) {
        throw new NotFoundException('City not found');
      }
      throw new HttpException('Failed to fetch weather data', 500);
    }
  }
}
