// import {
//     CanActivate,
//     ExecutionContext,
//     HttpException,
//     HttpStatus,
//     Injectable,
//     UnauthorizedException
// } from "@nestjs/common";
// import {Observable} from "rxjs";
// import { JwtService } from '@nestjs/jwt';
// import { Reflector } from '@nestjs/core';


// // import { ROLE_KEY } from '../decorators/role';
// // import { UserRole } from '../entity/user';
// // import { Creator, UserRole } from '../entity/creator';
// import { ROLE_KEY } from 'src/auth/decorators/role';



// @Injectable()
// export class RoleGuard2 implements CanActivate {
//   constructor(private jwtService: JwtService, private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     try {
//         const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
//             context.getHandler(),
//             context.getClass(),
//         ])
//         if (!requiredRoles) {
//             return true;
//         }
//         const req = context.switchToHttp().getRequest();
//         const authHeader = req.headers.authorization;
//         const bearer = authHeader.split(' ')[0]
//         const token = authHeader.split(' ')[1]

//         if (bearer !== 'Bearer' || !token) {
//             throw new UnauthorizedException({message: 'Пользователь не авторизован'})
//         }

//         const user = this.jwtService.verify(token);
//         req.user = user;
//         return user.roles.some((role: any)  => requiredRoles.includes(role.value));
//     } catch (e) {
//         console.log(e)
//         throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN)
//     }
//   }
// }