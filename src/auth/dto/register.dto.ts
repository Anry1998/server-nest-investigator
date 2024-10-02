import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class RegistrationDto {
  @IsNotEmpty({message: 'Не должно быть пустым'})
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  // @Length(6)
  @MinLength(5)
  @MaxLength(15)
  readonly password: string;


  // @IsArray()
  // @ArrayMinSize(1)

  // @ValidateNested, запускается валидация для объектов внутри массива
  // чтобы проверить все объекты нужен флаг each: true
  // @ValidateNested({each: true})

  // обязателен при проверке вложенных объектов
  // Теперь, при импорте IngredientDto весь массив будет проверяться на соответствие
  // @Type(() => IngredientDto)

  // вкладываем сам енум
  // @IsEnum(Unit)

  @IsNumber()
  readonly postid: number

  @IsNumber()
  readonly divisionid: number
  
  // @Min(1)
  @IsNumber()
  readonly organid: number

  // @IsNotEmpty()
  // @IsString()
  // @Length(8)
  // @Match('password')
  // passwordConfirm: string;
}