import { registerAs } from '@nestjs/config';

export default registerAs('weather', () => ({
  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
}));
