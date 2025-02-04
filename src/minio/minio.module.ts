import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';

@Module({
  providers: [MinioService],
  exports: [MinioService], // 🔴 Exporta o serviço para outros módulos
})
export class MinioModule {}
