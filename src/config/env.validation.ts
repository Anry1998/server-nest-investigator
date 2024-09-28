// В случае, когда мы забыли указать значение env, а оно обязательно нужно

import { plainToInstance } from 'class-transformer';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsString,
    validateSync
} from 'class-validator'


class EnvironmentVariables {
    @IsNotEmpty()
    @IsNumber()
    APP_PORT: number;
  
    @IsNotEmpty()
    @IsString()
    DB_PASSWORD: string;
  
    @IsNotEmpty()
    @IsString()
    DB_USERNAME: string;
  
    @IsNotEmpty()
    @IsString()
    DB_NAME: string;
  
    @IsNotEmpty()
    @IsNumber()
    DB_PORT: number;
  
    @IsNotEmpty()
    @IsString()
    DB_HOST: string;
  
    @IsNotEmpty()
    @IsBoolean()
    DB_LOGGING: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    DB_SYNCHRONIZATION: boolean;
  }
  
  export function validate(config: Record<string, unknown>) {
    // plainToInstance  - преобразует запись конфигурации в класс переменных среды
    // EnvironmentVariables - тип класса приемник; config - объект который мы хоти преобразовать
    // enableImplicitConversion - включить неявное преобразование (должен преобразовывать типы в типы из класса приемника)
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    });
    // validateSync - метод, который проверяет, все ли ограничения соблюдены н основании декораторов
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });
  
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    // если ошибок нет - возвращяем конфигурацию
    // этот метод мы импортируем 
    return validatedConfig;
  }