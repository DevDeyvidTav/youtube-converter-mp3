import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: 'minio',  // Nome do container no Docker Compose
      port: parseInt(process.env.MINIO_PORT, 10) || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    });
  }

  async onModuleInit() {
    try {
      const bucketName = 'youtube-audio';
      const exists = await this.minioClient.bucketExists(bucketName);
      if (!exists) {
        await this.minioClient.makeBucket(bucketName);
        console.log(`✅ Bucket "${bucketName}" criado no MinIO`);
      }
    } catch (error) {
      console.error('❌ Erro ao conectar no MinIO:', error);
    }
  }

  async uploadFile(bucketName: string, filePath: string, fileName: string): Promise<string> {
    await this.minioClient.fPutObject(bucketName, fileName, filePath);
    return this.getFileUrl(bucketName, fileName);
  }

  getFileUrl(bucketName: string, fileName: string): string {
    return `http://localhost:9000/${bucketName}/${fileName}`;
  }
}
