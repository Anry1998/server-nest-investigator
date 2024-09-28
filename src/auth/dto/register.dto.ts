import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  readonly password: string;

  @IsNumber()
  readonly postid: number

  @IsNumber()
  readonly divisionid: number
  
  @IsNumber()
  readonly organid: number

  // @IsNotEmpty()
  // @IsString()
  // @Length(8)
  // @Match('password')
  // passwordConfirm: string;
}