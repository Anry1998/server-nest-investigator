import { Injectable, CanActivate, ExecutionContext, Redirect } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/auth/decorators/role';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChatService } from '../chat.service';
import { Observable } from 'rxjs';
// import { ROLE_KEY } from '../decorators/role';
// import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

ChatService

@Injectable()
export class EmployeeIdInQuery implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext):  Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const startQuery = req._parsedUrl.query

    const queryArr = startQuery.split('&')

    let serchQueryEmployeId = ''

    for (let i=0; i < queryArr.length; i++) {
      if (queryArr[i].startsWith("employeId")) {
        serchQueryEmployeId = queryArr[i]
      }
    }

    if (serchQueryEmployeId) {
      const cutStartQuery = `${serchQueryEmployeId}`.replace('employeId=', '')
      if (req.employee.payload.id == cutStartQuery) return true
      else return false
    }
    return true
  }   
}