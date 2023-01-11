import { Repository } from 'typeorm';
import { Question } from './question.entity';
export declare class QuestionService {
    private questionRepository;
    constructor(questionRepository: Repository<Question>);
    findAll(): Promise<Question[]>;
    findOne(id: number): Promise<Question>;
    remove(id: string): Promise<void>;
    removeByForm(formId: number): Promise<void>;
}
