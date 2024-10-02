import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentialsException extends HttpException {
    messages;

    constructor(responce) {
        super(responce, HttpStatus.UNAUTHORIZED)
        this.message = responce
    }
}