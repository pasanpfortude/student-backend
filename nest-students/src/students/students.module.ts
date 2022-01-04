import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './models/student.model';
import { StudentResolver } from './students.resolver';
import { StudentsService } from './students.service';

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentsService,StudentResolver]
})
export class StudentsModule {}
