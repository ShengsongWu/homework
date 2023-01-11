import React, { FC, useState } from 'react';
import { Select } from 'antd';
import style from './visibility.module.scss';
import { IQuestion, IVisibility, OperatorType, VisibleType } from '@/types';
import { CHECKBOX_OPTIONS, OPERATOR_TYPE, VISIBLE_TYPE } from '@/utils';

interface IProps {
  currentQuestionIndex: number;
  questions: IQuestion[];
  value?: IVisibility;
  onChange: (value?: IVisibility) => void;
}

export const Visibility: FC<IProps> = (props) => {
  const { currentQuestionIndex: index, questions, onChange } = props;

  const value = props.value ?? { questionIndex: 0, operatorType: 'eq', selectedOptions: [] };
  const [relyQuestionIndex, setRelyQuestionIndex] = useState<number>(value.questionIndex ?? 0);
  const [operatorType, setOperatorType] = useState<OperatorType>(value.operatorType);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value.selectedOptions ?? []);
  const [visibleType, setVisibleType] = useState<VisibleType>(
    !props.value ? 'always' : 'conditional'
  );

  const otherQuestions = questions
    .filter((o) => o.index < index)
    .map((o) => ({ value: o.index, label: `${o.index + 1}#` }));
  const relyQuestion = questions.find((o) => o.index === relyQuestionIndex);
  const filteredOptions =
    relyQuestion?.type === 'checkbox'
      ? CHECKBOX_OPTIONS
      : (relyQuestion?.options ?? []).map((item) => ({
          value: item,
          label: item
        }));

  const onVisibleTypeChange = (type: VisibleType) => {
    setVisibleType(type);
    onChange(type === 'always' ? undefined : value);
  };

  const onQuestionIndexChange = (index: number) => {
    setRelyQuestionIndex(index);
    onChange({ ...value, questionIndex: index });
  };

  const onOperatorTypeChange = (type: OperatorType) => {
    setOperatorType(type);
    const isArray = selectedOptions instanceof Array;
    const items =
      type === 'eq' ? selectedOptions.slice(0, 1) : isArray ? selectedOptions : [selectedOptions];

    setSelectedOptions(items);
    onChange({ ...value, operatorType: type });
  };

  const onSelectedOptionsChange = (items: string[]) => {
    const toArray = typeof items === 'string' ? [items] : items;
    setSelectedOptions(toArray);
    onChange({ ...value, selectedOptions: toArray });
  };
  return (
    <div className="App">
      <Select
        value={visibleType}
        onChange={onVisibleTypeChange}
        style={{ width: 130 }}
        options={VISIBLE_TYPE}
      />
      {visibleType === 'conditional' ? (
        <>
          {' question'}
          <Select
            value={relyQuestionIndex}
            onChange={onQuestionIndexChange}
            style={{ width: 70 }}
            options={otherQuestions}
          />
          {"'s value "}
          <Select
            value={operatorType}
            onChange={onOperatorTypeChange}
            style={{ width: 76 }}
            options={OPERATOR_TYPE}
          />
          <br />
          <Select
            mode={operatorType === 'in' ? 'multiple' : undefined}
            placeholder="select values"
            value={selectedOptions}
            onChange={onSelectedOptionsChange}
            className={style.options}
            options={filteredOptions}
          />
        </>
      ) : null}
    </div>
  );
};
