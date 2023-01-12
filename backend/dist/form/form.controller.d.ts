import { PageResult, UniformResponse } from "src/common";
import { FormDto } from "./form.dto";
import { Form } from "./form.entity";
import { FormService } from "./form.service";
export declare class FormController {
    private readonly formService;
    constructor(formService: FormService);
    list(page: number, size: number): Promise<UniformResponse<PageResult<Form[]>>>;
    getOne(id: number): Promise<UniformResponse<Form>>;
    create(createFormDto: FormDto): Promise<UniformResponse<void>>;
    edit(editFormDto: FormDto): Promise<UniformResponse<void>>;
    delete(id: string): Promise<UniformResponse<void>>;
}
