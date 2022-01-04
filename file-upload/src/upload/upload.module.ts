import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { StudentsConsumer } from './consumer/fileProcessor.consumer';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'students',
    })],
  controllers: [UploadController],
  providers: [UploadService, StudentsConsumer]
})
export class UploadModule {}
