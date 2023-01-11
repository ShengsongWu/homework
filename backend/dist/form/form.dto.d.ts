import { QuestionDto } from 'src/question/question.dto';
export declare class FormDto {
    id?: number;
    title: string;
    questions: QuestionDto[];
    createdAt?: Date;
    updatedAt?: Date;
}
