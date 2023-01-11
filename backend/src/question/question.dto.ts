import { IsNotEmpty } from 'class-validator';

export class QuestionDto {
  id?: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  index: number;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  visibility: string;

  options: string[];
}
