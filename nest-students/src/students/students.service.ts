import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { NewStudent } from './dto/new-student.dto';
import { UpdatedStudent } from './dto/updated-students.dto';
import { Student } from './models/student.model';

@Injectable()
export class StudentsService {

     constructor( @InjectRepository(Student) private studentRepository: Repository<Student>){}
    async create(data: NewStudent): Promise<Student> {
      
        const student : Student= {
          id: 0,
          name: data.name,
          gender: data.gender,
          address: data.address,
          mobileNo: data.mobileNo,
          DOB: data.DOB,
          age: 0
        };
        return this.studentRepository.save(student);
      }
    
      async findOneById(id: number): Promise<Student> {
        return this.studentRepository.findOne(id).then((std) => {
          std.age = this.getAge(std.DOB.valueOf());
          return std;
        });
      }
    
      async findAll(): Promise<Student[]> {
        return this.studentRepository.find().then( stds => stds.map( std => {
          std.age = this.getAge(std.DOB.valueOf());
          return std;
        }));
      }
    
      async remove(id: number): Promise<DeleteResult> {
        return this.studentRepository.delete(id);
      }

      async update(data: UpdatedStudent): Promise<UpdateResult>{
        data.age = this.getAge(data.DOB);
        return this.studentRepository.update(data.id, data);
      }

      async bulkCreate(data: NewStudent[]): Promise<Student[]> {
        let students: Student[] = [];
        data.forEach((std)=>{
          const student : Student= {
            id: 0,
            name: std.name,
            gender: std.gender,
            address: std.address,
            mobileNo: std.mobileNo,
            DOB: std.DOB,
            age: 0
          };

          students.push(student);
        })
        
        return this.studentRepository.save(students);
      }

      public  getAge(dateString): number {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}
