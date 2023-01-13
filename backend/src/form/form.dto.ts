import { IsNotEmpty } from "class-validator";
import { QuestionDto } from "../question/question.dto";

export class FormDto {
  id?: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  questions: QuestionDto[];

  createdAt?: Date;

  updatedAt?: Date;
}

export const sampleForm: () => FormDto = () => {
  return {
    title: "This is a sample form",
    questions: [
      {
        index: 0,
        type: "checkbox",
        title: "This is a question title for checkbox",
      },
      {
        index: 1,
        type: "radio",
        title: "This is a question title for radio",
        options: ["option1", "option1", "option1", "option1", "option1"],
      },
      {
        index: 2,
        type: "multiDropdown",
        title: "This is a question title for multi-choice dropdown",
        options: ["option1", "option1", "option1", "option1", "option1"],
      },
      {
        index: 3,
        type: "multiDropdown",
        title: "This is a question title for multi-choice dropdown",
        options: ["option1", "option1", "option1", "option1", "option1"],
      },
    ],
  };
};
