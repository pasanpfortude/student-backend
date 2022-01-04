import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { Queue } from 'bull';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import { NewStudent } from 'src/models/newStudent.model';



@Injectable()
export class UploadService {

    constructor(@InjectQueue('students') private studentsQueue: Queue, private configService: ConfigService){}

     httpLink =  createHttpLink({
      uri: this.configService.get<string>('HTTP_ENDPOINT'),
      fetch: fetch
    });
    
     client = new ApolloClient({
      link: this.httpLink, cache: new InMemoryCache() 
    });

    async addToQueue(file: Express.Multer.File){
        await this.studentsQueue.add({
          file: file
          });
    }

    async bulkSave(newStudents: Array<any>){
        let newStds: NewStudent[]=[]
        newStudents.forEach(newStudent => {
            const newStd: NewStudent = {
                name: newStudent.Name,
                address: newStudent.Address,
                gender: newStudent.Gender,
                mobileNo: newStudent.MobileNo,
                DOB: newStudent.DOB

            }
            newStds.push(newStd);
        })
        this.client.mutate({mutation: gql `mutation Mutation($newStudents: [NewStudent!]!) {
            addStudents(newStudents: $newStudents)
          }`, variables:{newStudents: newStds} });
    }
      
}
