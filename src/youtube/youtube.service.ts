import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class YoutubeService {
  constructor(@InjectQueue('youtube') private youtubeQueue: Queue) {}

  async convertVideo(url: string) {
    console.log(`🔄 Adicionando job à fila: ${url}`);
    const job = await this.youtubeQueue.add('convert', { url });
    console.log(`✅ Job adicionado! ID: ${job.id}`);
    return { jobId: job.id, status: 'queued' };
  }
}
