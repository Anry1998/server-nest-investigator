import { HttpException } from "@nestjs/common";
export declare class InvalidCredentialsException extends HttpException {
    messages: any;
    constructor(responce: any);
}
