import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { YoutubeProcessor } from './youtube.processor';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'youtube',
    }),
  ],
  controllers: [YoutubeController],
  providers: [YoutubeService, YoutubeProcessor],
  exports: [YoutubeService],
})
export class YoutubeModule {}
