import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatDto } from './dto/chat.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  chat(@Body() chatDto: ChatDto) {
    const location = this.aiService.parseLocationFromQuestion(chatDto.question);
    if (!location) {
      throw new BadRequestException('Could not parse location from question');
    }
    return {
      message: 'You can get the weather info here',
      link: `/weather/${location.toLowerCase().replace(/\s+/g, '')}`,
    };
  }
}
