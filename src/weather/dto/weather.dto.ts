import { IsString, IsNotEmpty } from 'class-validator';

export class SearchWeatherDto {
  @IsString()
  @IsNotEmpty()
  country: string;
}

export class ChatDto {
  @IsString()
  @IsNotEmpty()
  question: string;
}
