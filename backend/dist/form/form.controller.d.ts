import { FormDto } from './form.dto';
import { Form } from './form.entity';
import { FormService } from './form.service';
export declare class FormController {
    private readonly formService;
    constructor(formService: FormService);
    list(page: number, size: number): Promise<Form[]>;
    create(createFormDto: FormDto): Promise<void>;
    edit(editFormDto: FormDto): Promise<void>;
    delete(id: string): Promise<void>;
}
