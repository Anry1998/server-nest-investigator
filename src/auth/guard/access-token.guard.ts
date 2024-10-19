import { Injectable, CanActivate, ExecutionContext, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
// AuthGuard('jwt') - указываем строку, соотвутствующую стратегии аутентификации
// то есть это продолжение passport-strategy
export class AccessTokenGuard extends AuthGuard('jwt') {
    // constructor(private reflector: Reflector) {super({})}

    // canActivate(context: ExecutionContext): boolean {
    //     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    //         context.getHandler(),
    //         context.getClass(),
    //     ]);
    //     if (isPublic) return true;

    //     else return true
    // }   
}