import { Controller, Post, Body } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post('convert-multiple')
  async convertMultiple(@Body() body: { urls: { link: string; name: string }[]; folderName: string }) {
    return this.youtubeService.convertVideos(body.urls, body.folderName);
  }
}
