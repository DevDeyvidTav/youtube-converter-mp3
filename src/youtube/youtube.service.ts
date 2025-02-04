import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { MinioService } from '../minio/minio.service';

const execPromise = promisify(exec);
const mkdirPromise = promisify(fs.mkdir);

@Injectable()
export class YoutubeService {
  constructor(private readonly minioService: MinioService) {}

  async convertVideos(videos: { link: string; name: string }[], folderName: string) {
    const folderPath = `/tmp/${folderName}`;
    const bucketName = 'youtube-audio';

    try {
      // 1️⃣ Criar a pasta no sistema de arquivos
      await mkdirPromise(folderPath, { recursive: true });

      const downloadLinks = [];

      for (const { link, name } of videos) {
        const sanitizedFileName = name.replace(/[^a-zA-Z0-9-_]/g, '_') + '.mp3'; // Remove caracteres inválidos
        const outputFile = path.join(folderPath, sanitizedFileName);

        console.log(`🔄 Convertendo vídeo: ${link} como ${sanitizedFileName}`);
        await execPromise(`yt-dlp -x --audio-format mp3 -o "${outputFile}" ${link}`);
        console.log(`✅ Conversão concluída! Arquivo: ${outputFile}`);

        console.log(`🔄 Fazendo upload para MinIO: ${folderName}/${sanitizedFileName}`);
        const fileUrl = await this.minioService.uploadFile(bucketName, outputFile, `${folderName}/${sanitizedFileName}`);
        console.log(`✅ Upload concluído! Link: ${fileUrl}`);

        downloadLinks.push({ name, fileUrl });
      }

      return { success: true, folder: folderName, files: downloadLinks };
    } catch (error) {
      console.error('❌ Erro ao converter:', error);
      return { success: false, error: error.message };
    }
  }
}
