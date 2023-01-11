import React, { FC, useEffect, useState } from 'react';
import { Button, Drawer, Form, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IForm } from '@/types/types';
import { Question } from '@/components/question';
import TextArea from 'antd/es/input/TextArea';
import { createEmptyQuestion } from '@/utils';
import { createForm, updateForm } from '@/store';

export interface IProps {
  onClose: (needReload?: boolean) => void;
  open: boolean;
  form?: IForm;
  drawerTitle: string;
}

export const FormBuilder: FC<IProps> = (props) => {
  const { onClose, open, drawerTitle } = props;
  const [form, setForm] = useState(props.form);
  const [title, setTitle] = useState(form?.title);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(form?.questions ?? []);
  const [currentEditQuestionIndex, setCurrentEditQuestionIndex] = useState<number>(-1);
  const antForm = Form.useForm()[0];

  useEffect(() => {
    setForm(props.form);
    setQuestions(props.form?.questions ?? []);
    setTitle(props.form?.title);
  }, [props.form, antForm]);

  const close = () => {
    setCurrentEditQuestionIndex(-1);
    onClose();
  };

  const create = () => {
    const index = questions?.length ? questions[questions.length - 1].index + 1 : 0;
    const newQuestion = createEmptyQuestion(index);
    setQuestions([...questions, newQuestion]);
  };

  const onSubmit = () => {
    setLoading(true);
    const api = form ? updateForm : createForm;
    const dto = { id: form?.id ?? -1, title: title ?? '', questions };

    api(dto).then(() => {
      setLoading(false);
      onClose(true);
    });
  };

  return (
    <Drawer
      title={drawerTitle}
      placement="right"
      onClose={close}
      open={open}
      width={630}
      extra={
        <Space>
          <Button onClick={onSubmit} type="primary" loading={loading}>
            Submit
          </Button>
        </Space>
      }>
      <Form layout={'horizontal'} form={antForm} size="small" labelCol={{ span: 4 }}>
        <Form.Item label="Form Title:" required>
          <TextArea
            placeholder="input form title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Item>
        <fieldset>
          <legend>Questions:</legend>
          {questions.map((q, i) => (
            <Question
              otherQuestions={questions.filter((o) => o.index !== i)}
              value={q}
              onChange={(q) => {
                setQuestions(questions.map((x) => (x.index === q.index ? q : x)));
              }}
              key={q.index}
              currentEditIndex={currentEditQuestionIndex}
              enterEdit={() => {
                setCurrentEditQuestionIndex(i);
              }}
              finishEdit={() => {
                setCurrentEditQuestionIndex(-1);
              }}
              onDelete={(index) => {
                setQuestions(
                  questions
                    .filter((_, i) => i !== index)
                    .map((x) => (x.index > index ? { ...x, index: x.index - 1 } : x))
                );
              }}
            />
          ))}

          <Form.Item>
            <Button
              type="dashed"
              onClick={create}
              style={{ width: '100%' }}
              icon={<PlusOutlined />}>
              Add Question
            </Button>
          </Form.Item>
        </fieldset>
      </Form>
    </Drawer>
  );
};
