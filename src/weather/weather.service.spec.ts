import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { WeatherApiService } from './weather-api.service';

const mockWeatherApiService = {
  getWeatherByCity: jest.fn().mockResolvedValue({ temp: 25, city: 'Lagos' }),
};

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: WeatherApiService, useValue: mockWeatherApiService },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get weather for a city', async () => {
    const result = await service.getWeatherByCity('Lagos');
    expect(result).toEqual({ temp: 25, city: 'Lagos' });
  });
});
