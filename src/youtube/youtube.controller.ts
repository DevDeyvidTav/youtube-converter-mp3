import { Controller, Post, Body } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post('convert')
  async convert(@Body('url') url: string) {
    return this.youtubeService.convertVideo(url);
  }
}
