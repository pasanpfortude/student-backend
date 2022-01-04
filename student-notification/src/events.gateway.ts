import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { StudentOperations } from "./enums/StudentOperations.enum";

@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class EventsGateway {

    @WebSocketServer()
    server: Server;

   emitStudentAddedEvent(msg: any){
       this.server.emit(StudentOperations.STUDENT_ADDED,msg);
   }
    emitStudentUpdatedEvent(msg: any){
      this.server.emit(StudentOperations.STUDENT_UPDATED,msg);
  }
  emitStudentRemovedEvent(msg: any){
    this.server.emit(StudentOperations.STUDENT_REMOVED,msg);
  }

  emitStudentsAddedEvent(msg: any){
    this.server.emit(StudentOperations.STUDENTS_ADDED,msg);
  }

}