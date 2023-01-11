import React, { FC, useState } from 'react';
import { View } from './view';
import { Edit } from './edit';
import { IQuestion, QuestionMode } from '@/types';

interface IProps {
  otherQuestions: IQuestion[];
  value: IQuestion;
  onChange?: (value: IQuestion) => void;
  enterEdit?: () => void;
  finishEdit?: () => void;
  currentEditIndex?: number;
  onDelete?: (index: number) => void;
  isPublic?: boolean;
  onInteract?: (values: string[]) => void;
  listIndex?: number;
}

export const Question: FC<IProps> = (props) => {
  const {
    value,
    otherQuestions,
    enterEdit,
    finishEdit,
    currentEditIndex,
    onDelete,
    onChange,
    isPublic,
    onInteract,
    listIndex
  } = props;
  const [mode, setMode] = useState<QuestionMode>('view');

  const changeMode = (nextMode: QuestionMode) => {
    if (nextMode === 'edit') {
      enterEdit?.();
    } else if (nextMode === 'view') {
      finishEdit?.();
    }
    setMode(nextMode);
  };

  return mode === 'edit' ? (
    <Edit
      setMode={changeMode}
      question={value}
      otherQuestions={otherQuestions}
      onChange={(v) => {
        onChange?.(v);
      }}
    />
  ) : (
    <View
      isPublic={isPublic}
      setMode={changeMode}
      question={value}
      disabled={value.index !== currentEditIndex && currentEditIndex !== -1}
      onDelete={(i) => {
        onDelete?.(i);
      }}
      onInteract={onInteract}
      listIndex={listIndex}
    />
  );
};
