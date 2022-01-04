import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { UploadService } from '../upload.service';

@Processor('students')
export class StudentsConsumer {

    constructor(private uploadService: UploadService){}

    private readonly logger = new Logger(StudentsConsumer.name);

    @Process()
    async processFile(job: Job<any>){
        let xlsx = require('xlsx');
        let wb= xlsx.read(job.data.file.buffer.data, {type: "buffer",cellDates: true});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = xlsx.utils.sheet_to_json(ws);
        await this.uploadService.bulkSave(data);

    }

    @OnQueueCompleted()
    onComplete(job: Job){
        console.log("Processed",job.id);
    }
  
}