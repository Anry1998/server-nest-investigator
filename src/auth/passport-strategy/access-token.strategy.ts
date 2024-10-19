import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

type JwtPayload = {
  sub: string;
  role: string;
};

// особо невникая в этот сложный код - эта штука работает как миделвеа в ноде, проверяя заголовок авторизации
 
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  isPublic: boolean
  constructor(
    private configService: ConfigService,
    // private reflector: Reflector
  ) {
    super({
      // перехватываем аксес токен из http запроса
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET') ?? '',
    });
  }

  validate(payload: JwtPayload) {
    console.log("payload: ", payload)
    return payload;
  }
}



// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Reflector } from '@nestjs/core';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

// type JwtPayload = {
//   sub: string;
//   role: string;
// };

// особо невникая в этот сложный код - эта штука работает как миделвеа в ноде, проверяя заголовок авторизации
 
// @Injectable()
// export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
//   isPublic: boolean
//   constructor(
//     private configService: ConfigService,
//     private reflector: Reflector
//   ) {
//     super({
//       // перехватываем аксес токен из http запроса
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET') ?? '',
//     });
//   }

//   canActivate(context: ExecutionContext): boolean {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//         context.getHandler(),
//         context.getClass(),
//     ]);
//     if (isPublic) return true;
//   }

//   validate(payload: JwtPayload) {
//     return payload;
//   }
// }