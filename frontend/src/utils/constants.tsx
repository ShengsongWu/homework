import { CheckboxType, OperatorType, QuestionType, VisibleType } from '@/types';

export const QUESTION_TYPE: Array<{ value: QuestionType; label: string }> = [
  {
    value: 'checkbox',
    label: 'Checkbox'
  },
  {
    value: 'radio',
    label: 'Radio buttons'
  },
  {
    value: 'multiDropdown',
    label: 'Multiple-dropdown'
  }
];

export const OPERATOR_TYPE: Array<{ value: OperatorType; label: string }> = [
  {
    value: 'eq',
    label: 'equal'
  },
  {
    value: 'in',
    label: '  in  '
  }
];

export const VISIBLE_TYPE: Array<{ value: VisibleType; label: string }> = [
  {
    value: 'always',
    label: 'Always visible'
  },
  {
    value: 'conditional',
    label: 'Visible when '
  }
];

export const FORM_ITEM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
export const FORM_ITEM_LAYOUT_WITHOUT_LABEL = {
  wrapperCol: { span: 20, offset: 4 }
};
export const BUTTON_ITEM_LAYOUT = {
  wrapperCol: { span: 14, offset: 4 }
};

export const CHECKBOX_OPTIONS: Array<{ value: CheckboxType; label: string }> = [
  {
    value: 'checked',
    label: 'Checked'
  },
  {
    value: 'unchecked',
    label: 'Unchecked'
  }
];
