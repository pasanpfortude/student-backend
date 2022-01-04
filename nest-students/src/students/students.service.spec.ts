import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { NewStudent } from './dto/new-student.dto';
import { Student } from './models/student.model';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let repository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsService,
        {
          provide: getRepositoryToken(Student),
          useClass: Repository,
        }],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repository = module.get<Repository<Student>>(getRepositoryToken(Student));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create',() => {
it('should return Promise student', async() => {
  const newStudent: NewStudent = {
    name: 'TestName',
    address: 'TestAddress',
    DOB: new Date(),
    gender: 'Male',
    mobileNo: 711408523
  }
  const student: Student = {
    id: 0,
    name: 'TestName',
    address: 'TestAddress',
    DOB: new Date(),
    gender: 'Male',
    age: 0,
    mobileNo: 711408523
  }
  jest.spyOn(repository,'save').mockImplementation(async() => student);

  expect(await service.create(newStudent)).toBe(student);

})
  });

  describe('findOneById',() => {
    it('should return  student', async() => {
      const student: Student = {
        id: 0,
        name: 'TestName',
        address: 'TestAddress',
        DOB: new Date(),
        gender: 'Male',
        age: 0,
        mobileNo: 711408523
      }
      jest.spyOn(repository,'findOne').mockImplementation(async() => student);
    
      expect(await service.findOneById(0)).toBe(student);
    
    })
      });

      describe('findAll',() => {
        it('should return  students array', async() => {
          const student: Student = {
            id: 0,
            name: 'TestName',
            address: 'TestAddress',
            DOB: new Date(),
            gender: 'Male',
            age: 0,
            mobileNo: 711408523
          }
          const stds =[student];
          jest.spyOn(repository,'find').mockImplementation(async() => stds);
        
          expect(await service.findAll()).toBe(stds);
        
        })
          });

    describe('remove',() => {
      it('should return  Delete result', async() => {
        const delteResult = new DeleteResult();
        jest.spyOn(repository,'delete').mockImplementation(async() => delteResult);
        
        expect(await service.remove(0)).toBe(delteResult);
      
      })
        });

    describe('update',() => {
      it('should return  Update result', async() => {
        const updateResult = new UpdateResult();
        const student: Student = {
          id: 0,
          name: 'TestName',
          address: 'TestAddress',
          DOB: new Date(),
          gender: 'Male',
          age: 0,
          mobileNo: 711408523
        }
        jest.spyOn(repository,'update').mockImplementation(async() => updateResult);
        
        expect(await service.update(student)).toBe(updateResult);
      
      })
        });

    describe('getAge',() => {
      it('should calculae age', async() => {
        
        expect(service.getAge('2020-01-01')).toBe(2);
      
      })
        });

    // describe('bulkCreate',() => {
    //   it('should return student array', async() => {
    //     const newStudent: NewStudent = {
    //       name: 'TestName',
    //       address: 'TestAddress',
    //       DOB: new Date(),
    //       gender: 'Male',
    //       mobileNo: 711408523
    //     }
    //     const student: Student = {
    //       id: 0,
    //       name: 'TestName',
    //       address: 'TestAddress',
    //       DOB: new Date(),
    //       gender: 'Male',
    //       age: 0,
    //       mobileNo: 711408523
    //     }
    //     const args = [newStudent];
    //     const result = [student]
    //     jest.spyOn(repository,'save').mockImplementation(async() => result);
        
    //     expect(await service.bulkCreate(args)).toBe(result);
      
    //   })
    //     });
});
