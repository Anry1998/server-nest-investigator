import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role';
// import {  } from '../entity/creator';

import { PositionEmployee } from 'src/position-employee/entity/position-employee.model';
PositionEmployee



 
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<PositionEmployee>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return user.role === requiredRole;
  }
}
 


// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// // import { ROLE_KEY } from '../decorators/role';
// // import { UserRole } from '../entity/user';
// import { Creator, UserRole } from '../entity/creator';
// import { ROLES_KEY } from 'src/auth/decorators/role';



// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRole) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     return user.role === requiredRole;
//   }
// }