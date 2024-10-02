import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({message: 'Не должно быть пустым'})
  @IsEmail({}, {message: 'Некоректный email'})
  email: string;

  @IsNotEmpty()
  password: string;
}