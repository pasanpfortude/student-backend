import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomException extends HttpException {
    constructor(msg: string, statsCode: HttpStatus) {
      super(msg, statsCode);
    }
  }