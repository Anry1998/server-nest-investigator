import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
