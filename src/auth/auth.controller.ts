import { Body, Controller, Get, Post, UseGuards , Req, Res, Delete,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { AccessTokenGuard } from './guard/access-token.guard';
import { Role } from 'src/auth/decorators/role';
// import {  UserRoles } from './entity/creator';
import { RoleGuard } from './guard/authorization.guard';

import { RoleGuard2 } from './guard/role.guard';

import { Request, Response } from 'express';



@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/registration')
  async register(
    @Body() registrationDto: RegisterDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const registration = await this.authService.registration(registrationDto);
    // response.cookie('refreshToken', registration.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true })
    return registration
  }

  @Post('/login')
  async login(
    @Body() registrationDto: RegisterDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const login = await this.authService.login(registrationDto); 
    response.cookie('refreshToken', login.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true })
    return login
  }

  @Delete('logout') 
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    try{
      const refresh = request.cookies['refreshToken']
      const logout = await this.authService.logout(refresh)
      response.clearCookie('refreshToken')
      return 'Пока, пока'
    } catch(e) {
      console.log(e)
    }
  }

  // @UseGuards(AccessTokenGuard)
  @Get('refresh') 
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    try{
      const refresh = request.cookies['refreshToken']
      const tokens = await this.authService.refresh(refresh)
      response.cookie('refreshToken', tokens.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
      return tokens
    } catch(e) {
      console.log(e)
    }
  }

  // @Post('/login')
  // async login(@Body() loginDto: LoginDto) {
  //   return await this.authService.login(loginDto);
  // }


  // @Post('/refresh-token')
  // async refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
  //   return await this.authService.refreshTokens(refreshToken);
  // }
   
  // @Role(UserRole.USER) 
  // @Role(UserRole.USER)
  // @UseGuards(  AccessTokenGuard, UserRoles )
  // @UseGuards(AccessTokenGuard, RoleGuard )
  @Get('/testauthguard')
  async testauthGuard() {
    return 'testauthGuard'
  }
}
