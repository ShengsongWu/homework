import { IsNotEmpty } from 'class-validator';
import { QuestionDto } from 'src/question/question.dto';

export class FormDto {
  id?: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  questions: QuestionDto[];

  createdAt?: Date;

  updatedAt?: Date;
}
