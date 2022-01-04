import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

    constructor(private uploadService: UploadService){}

    @Post()
    @UseInterceptors(FileInterceptor('files'))
    uploadFile(@UploadedFile() file: Express.Multer.File){
       this.uploadService.addToQueue(file);
    }
}
