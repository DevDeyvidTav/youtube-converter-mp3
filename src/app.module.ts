import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'redis', // 🔴 ALTERE PARA 'redis' (NOME DO SERVIÇO NO DOCKER-COMPOSE)
        port: 6379,
      },
    }),
    YoutubeModule,
  ],
})
export class AppModule {}
