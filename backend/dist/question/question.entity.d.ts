import { Form } from 'src/form/form.entity';
export declare class Question {
    id?: number;
    title: string;
    index: number;
    type: string;
    form?: Form;
    visibility?: string;
    options: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
