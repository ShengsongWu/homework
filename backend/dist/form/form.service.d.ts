import { DataSource, Repository } from 'typeorm';
import { FormDto } from './form.dto';
import { Form } from './form.entity';
import { QuestionService } from 'src/question/question.service';
export declare class FormService {
    private formRepository;
    private questionService;
    private dataSource;
    constructor(formRepository: Repository<Form>, questionService: QuestionService, dataSource: DataSource);
    findAll(): Promise<Form[]>;
    findByPage(page: number, pageSize: number): Promise<Form[]>;
    findOne(id: number): Promise<Form>;
    create(createFormDto: FormDto): Promise<void>;
    edit(editFormDto: FormDto): Promise<void>;
    remove(id: string): Promise<void>;
}
