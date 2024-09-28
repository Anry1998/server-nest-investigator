import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { hash, compare } from 'bcrypt';
import { CrudEmployeeService } from '../create-employee/crud-employee.service';
import { CreateEmployeeDto } from 'src/create-employee/dto/create-employee.dto';
import { TokenService } from './token.service';

export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor (
    private crudEmployeeService: CrudEmployeeService,
    private tokenService: TokenService,
  ) {}

  private abbreviatedPostList(data: any): number[] {
    let arr = []
    data.forEach((element: any)  => {
        Object.entries(element).forEach((element: any) => {
          if (element[0] === 'id') {arr.push(element[1])}
        })
      });
    return arr
  }
  
  private hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
  private comparePassword(userDtoPassword: string, userPassword: string): Promise<boolean> {
    return compare(userDtoPassword, userPassword);
  }

  async registration(userDto: CreateEmployeeDto) { 
    const condidate = await this.crudEmployeeService.getEmployeeByEmail(userDto.email)
    if (condidate) {
        throw new HttpException(`Пользователь с таким email: ${userDto.email} уже существует`, HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await this.hashPassword(userDto.password)
    const employee = await this.crudEmployeeService.createEmployee({...userDto, password: hashPassword})
    
    const abbreviatedPostList = this.abbreviatedPostList(employee.post)
    const tokens = await this.tokenService.generateTokens({id: employee.id, email: employee.email, posts: abbreviatedPostList } )
    await this.tokenService.saveRefreshTokenAfterRegistration(employee.id, tokens.refreshToken)
    return {...tokens}   
  }

  async login(userDto: CreateEmployeeDto) {
    const condidate = await this.crudEmployeeService.getEmployeeByEmail(userDto.email)
    if (!condidate) {
      throw new HttpException(`Пользователь с email: ${userDto.email} не был найден`, HttpStatus.BAD_REQUEST)
    }
    const comparePassword = await this.comparePassword(userDto.password, condidate.password)
    if (!comparePassword) {
      throw new HttpException(`Введен неверный пароль`, HttpStatus.BAD_REQUEST)
    }
    const abbreviatedPostList = this.abbreviatedPostList(condidate.post)
    const tokens = await this.tokenService.generateTokens({id: condidate.id, email: condidate.email, posts: abbreviatedPostList } )
    await this.tokenService.saveRefreshTokenAfterLogin(condidate.id, tokens.refreshToken)
    return {...tokens}
  }

  async logout(refreshToken: string) {
    const token = await this.tokenService.removeRefreshToken(refreshToken)
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException('Токен отсутствует', HttpStatus.FORBIDDEN)
    }
    const employeeData = await this.tokenService.validateRefreshToken(refreshToken)
    console.log('employeeData',employeeData)
    const tokenFromDb = await this.tokenService.findRefreshToken(refreshToken)
    console.log('tokenFromDb', tokenFromDb)
    if (!employeeData || !tokenFromDb) {
      throw new HttpException('Ошибка авторизации', HttpStatus.FORBIDDEN)
    }
    const tokens = await this.tokenService.generateTokens({id: employeeData.id, email: employeeData.email, posts: employeeData.post})
    await this.tokenService.saveRefreshTokenAfterRegistration(employeeData.id, tokens.refreshToken)
    return {...tokens}
  }

  // constructor(
  //   @InjectRepository(Creator) private userRepository: Repository<Creator>,
  //   @InjectRepository(Creator) private userRolesRepository: Repository<UserRoles>,
  //   private jwtService: JwtService,
  //   private configService: ConfigService,
  // ) {}

  // async createUser(registerDto: RegisterDto) {
  //   const existingUser = await this.userRepository.findOne({
  //     where: { email: registerDto.email },
  //   });
  //   if (existingUser) {
  //     throw new HttpException('Email уже зарегистрирован!', 400);
  //   }

  //   const protectedPassword = await this.hashPassword(registerDto.password);

  //   await this.userRepository.save({
  //     email: registerDto.email,
  //     password: protectedPassword,
  //     rolesId: [1, 2],
  //   });
  // }

 

  // async login(loginDto: LoginDto): Promise<JWTTokens> {
  //   const { email, password } = loginDto;
  //   const user = await this.userRepository.findOne({ where: { email } });

  //   if (!user) {
  //     throw new HttpException('Неверный логин', 400);
  //   }

  //   const validPassword = await compare(password, user.password);

  //   if (!validPassword) {
  //     throw new HttpException('Неверный пароль', 400);
  //   }

  //   return this.getTokens(user);
  // }

  // async refreshTokens(token: string): Promise<JWTTokens> {
  //   try {
  //     const { sub: email } = await this.jwtService.verifyAsync(token, {
  //       secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
  //     });
  //     // findOneOrFail - найдите Его Или Потерпите неудачу
  //     const user = await this.userRepository.findOneOrFail({
  //       where: { email },
  //     });
  //     return  email 
  //     return this.getTokens(user);
  //   } catch (err) {
  //     throw new HttpException('Invalid credentials', 400);
  //   }
  // }



  // private async getTokens(user: Creator): Promise<JWTTokens> {
  //   // ждем результата выполнения всех генераций токенов, а затем присваиваем их переменным
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync(
  //       // первый аргумент - жанные, которые будут сохранены
  //       {
  //         sub: user.email,
  //         // role: user.roles,
  //       },
        
  //       {
  //         //  секретный ключ 
  //         secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
  //         // настройка срока действия токена
  //         expiresIn: this.configService.get<string>(
  //           'JWT_ACCESS_TOKEN_EXPIRATION',
  //         ),
  //       },
  //     ),

  //     // Генерация второго токена, другой ключ и более длительный срок действия
  //     this.jwtService.signAsync(
  //       {
  //         sub: user.email,
  //         // role: user.roles,
  //       },
  //       {
  //         secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
  //         expiresIn: this.configService.get<string>(
  //           'JWT_REFRESH_TOKEN_EXPIRATION',
  //         ),
  //       },
  //     ),
  //   ]);

  //   return {
  //     accessToken,
  //     refreshToken,
  //   };
  // }
}
