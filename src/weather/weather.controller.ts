import { Controller, Get, Param, Query, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { countryToCapital } from './country-capitals';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('popular')
  async getPopularWeather() {
    try {
      return await this.weatherService.getPopularCitiesWeather();
    } catch (error) {
      // console.error('Error fetching popular cities weather:', error);
      throw new InternalServerErrorException('Failed to fetch popular cities weather');
    }
  }

  @Get('search')
  async searchWeather(@Query('country') country: string) {
    try {
      const mappedCity = countryToCapital[country?.toLowerCase().replace(/\s/g, '')];
      if (!mappedCity) throw new BadRequestException('Country not supported.');
      return await this.weatherService.getWeatherByCity(mappedCity);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to fetch weather for country');
    }
  }

  @Get(':city')
  async getCityWeather(@Param('city') city: string) {
    try {
      // Get yesterday, today, and tomorrow's weather using WeatherAPI endpoints
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // Format dates as YYYY-MM-DD
      const format = (d: Date) => d.toISOString().split('T')[0];
      const [yesterdayStr, todayStr, tomorrowStr] = [format(yesterday), format(today), format(tomorrow)];

      const [yesterdayWeather, todayWeather, tomorrowWeather] = await Promise.all([
        this.weatherService.getWeatherByCityAndDate(city, yesterdayStr),
        this.weatherService.getWeatherByCityAndDate(city, todayStr),
        this.weatherService.getWeatherByCityAndDate(city, tomorrowStr),
      ]);

      return {
        city,
        weather: {
          yesterday: yesterdayWeather,
          today: todayWeather,
          tomorrow: tomorrowWeather,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch weather for city');
    }
  }
}
