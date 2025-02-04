import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MinioModule } from '../minio/minio.module'; // 🔴 Importando o MinIO
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'youtube',
    }),
    MinioModule, // 🔴 Agora o MinIO pode ser injetado no YoutubeProcessor
  ],
  providers: [ YoutubeService],
  controllers: [YoutubeController]
})
export class YoutubeModule {}
