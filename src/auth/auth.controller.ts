import { Body, Controller, Get, Post, UseGuards , Req, Res, Delete, UsePipes, UseInterceptors, ClassSerializerInterceptor,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegistrationDto } from './dto/register.dto';
import { AccessTokenGuard } from './guard/access-token.guard';
import { Role } from 'src/auth/decorators/role';
// import {  UserRoles } from './entity/creator';
import { PostGuard } from './guard/post.guard';

// import { RoleGuard2 } from './guard/role.guard';

import { Request, Response } from 'express';


import { Public } from 'src/auth/decorators/public.decorator';
import { ValidationPipe } from 'src/pipes/validation.pipe';


@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  // @UsePipes(ValidationPipe)
  @Post('/registration')
  async register(
    @Body() registrationDto: RegistrationDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const registration = await this.authService.registration(registrationDto);
    response.cookie('refresh-token', registration.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true })
    return registration
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login( 
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const login = await this.authService.login(loginDto); 
    response.cookie('refresh-token', login.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true })
    return login
  }

  @Delete('logout') 
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    try{
      const refresh = request.cookies['refresh-token']
      const logout = await this.authService.logout(refresh)
      response.clearCookie('refresh-token')
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
      const refresh = request.cookies['refresh-token']
      console.log(refresh) 
      const tokens = await this.authService.refresh(refresh)
      response.cookie('refresh-token', tokens.refreshToken, {maxAge:30*24*60*60*1000, httpOnly: true})
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
  // @UseGuards(AccessTokenGuard)
  @Get('/testauth')
  async testauthGuard() {
    // throw new Error('Test error')
    return 'testauth'
  }
}
