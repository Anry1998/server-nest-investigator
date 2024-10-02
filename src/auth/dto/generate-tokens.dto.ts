import { IsNotEmpty } from 'class-validator';

export class GenerateTokensDto {
  @IsNotEmpty()
  id: number;

  email: string

  posts: number[]

  organId: number

  divisionId: number
}