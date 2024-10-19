import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    let requiredRole = this.reflector.getAllAndOverride<number[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    requiredRole = requiredRole.map(item => +item)
    return user.payload.posts.some((role: any)  => requiredRole.includes(role));
  }
}