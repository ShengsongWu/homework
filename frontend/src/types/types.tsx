export type QuestionMode = 'view' | 'edit';

export type QuestionType = 'checkbox' | 'radio' | 'multiDropdown';

export type OperatorType = 'eq' | 'in';

export type VisibleType = 'always' | 'conditional';

export type CheckboxType = 'checked' | 'unchecked';

export interface IForm {
  id: number;
  title: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  index: number;
  type: QuestionType;
  title: string;
  visibility?: IVisibility;
  options?: string[];
}

export interface IVisibility {
  questionIndex: number;
  operatorType: OperatorType;
  selectedOptions?: string[];
}
