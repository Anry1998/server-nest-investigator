import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// AuthGuard('jwt') - указываем строку, соотвутствующую стратегии аутентификации
// то есть это продолжение passport-strategy
export class AccessTokenGuard extends AuthGuard('jwt') {}