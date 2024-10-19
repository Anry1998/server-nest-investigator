import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class EmployeeIdInQuery implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
