import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  parseLocationFromQuestion(question: string): string | null {
    // Simple regex to extract city/location from question
    const match = question.match(/in ([a-zA-Z\s]+)/i);
    if (match && match[1]) {
      return match[1].trim();
    }
    return null;
  }
}
