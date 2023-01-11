import { Question } from 'src/question/question.entity';
export declare class Form {
    id?: number;
    title: string;
    questions: Question[];
    createdAt?: Date;
    updatedAt?: Date;
}
