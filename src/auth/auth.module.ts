import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entity/user';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './passport-strategy/access-token.strategy';
import { Token } from './entity/token.model';
import { CrudEmployeeModule } from '../create-employee/crud-employee.module';
import { TokenService } from './token.service';
import { CrudEmployeeService } from '../create-employee/crud-employee.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Token]), 
    CrudEmployeeModule,
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [AuthService, TokenService],
})
export class AuthModule {} 
