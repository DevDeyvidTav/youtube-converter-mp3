import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Processor('youtube')
export class YoutubeProcessor extends WorkerHost {
  async process(job: Job) {
    console.log(`🔧 Processando job: ${job.id} - URL: ${job.data.url}`);
    const outputFile = `/tmp/${job.id}.mp3`;

    try {
      const { stdout, stderr } = await execPromise(`yt-dlp -x --audio-format mp3 -o "${outputFile}" ${job.data.url}`);
      console.log(`✅ Download concluído! Arquivo: ${outputFile}`);
      console.log(`📜 STDOUT: ${stdout}`);
      console.error(`⚠️ STDERR: ${stderr}`);

      return { success: true, file: outputFile };
    } catch (error) {
      console.error('❌ Erro ao converter:', error);
      return { success: false, error: error.message };
    }
  }

  @OnWorkerEvent('completed')
  async onJobCompleted(job: Job) {
    console.log(`🎉 Job finalizado com sucesso! ID: ${job.id}`);
  }

  @OnWorkerEvent('failed')
  async onJobFailed(job: Job, err: Error) {
    console.error(`❌ Job falhou! ID: ${job.id} - Erro: ${err.message}`);
  }
}
