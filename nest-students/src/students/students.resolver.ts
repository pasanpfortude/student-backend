import { BadRequestException, HttpException, HttpStatus, Logger, NotFoundException, UseFilters } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Int, Subscription } from "@nestjs/graphql";
import { NewStudent } from "./dto/new-student.dto";
import { UpdatedStudent } from "./dto/updated-students.dto";
import { Student } from "./models/student.model";
import { StudentsService } from "./students.service";
import {PubSub} from 'graphql-subscriptions' 
import { CustomException } from "src/Exceptions/custom.exception";

const pubSub = new PubSub();

@Resolver(of => Student)
export class StudentResolver{

    constructor(private studentService: StudentsService) {}

    private readonly logger = new Logger(StudentResolver.name);

    @Query(returns => Student)
    async student(@Args('id', { type: () => Int}) id: number): Promise<Student> {
      let student;
      try {
      student = await this.studentService.findOneById(id);
      } catch (error) {
        this.logger.error(error);
        throw new CustomException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      if (!student) {
        throw new NotFoundException(id);
      }
      
      return student;
      
    }
  
    @Query(returns => [Student])
    students(): Promise<Student[]> {
      try {
      return this.studentService.findAll();
      } catch (error) {
        this.logger.error(error);
        throw new CustomException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Mutation(returns => Boolean!, {nullable: true})
    async addStudent(
      @Args('newStudent') newStudent: NewStudent,
    ){
      try {
      await this.studentService.create(newStudent);
      pubSub.publish('studentAdded',{});
      } catch (error) {
       this.logger.error(error);
       throw new CustomException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Mutation(returns => Boolean!, {nullable: true})
    async addStudents(
      @Args('newStudents', {type: () => [NewStudent]}) newStudents: NewStudent[],
    ){
      try {
      await this.studentService.bulkCreate(newStudents);
      pubSub.publish('studentsAdded',{});
      } catch (error) {
        this.logger.error(error);
        throw new CustomException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Mutation(returns => Boolean!, {nullable: true})
    async removeStudent(@Args('id', { type: () => Int}) id: number) {
      try {
       await this.studentService.remove(id);
       pubSub.publish('studentRemoved',{});
      } catch (error) {
        this.logger.error(error);
        throw new CustomException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Mutation(returns => Boolean!, {nullable: true})
    async updateStudent(@Args('updatedStudent') updatedStudent: UpdatedStudent) {
      try {
       await this.studentService.update(updatedStudent);
       pubSub.publish('studentUpdated',{});
      } catch (error) {
        this.logger.error(error);
        throw new CustomException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Subscription((returns) => Boolean!, {nullable: true})
    studentAdded() {
      return pubSub.asyncIterator('studentAdded');
    }

    @Subscription((returns) => Boolean!, {nullable: true})
    studentsAdded() {
      return pubSub.asyncIterator('studentsAdded');
    }

    @Subscription((returns) => Boolean!, {nullable: true})
    studentUpdated() {
      return pubSub.asyncIterator('studentUpdated');
    }

    @Subscription((returns) => Boolean!, {nullable: true})
    studentRemoved() {
      return pubSub.asyncIterator('studentRemoved');
    }
}