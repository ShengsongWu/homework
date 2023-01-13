import React, { FC, useEffect, useState } from "react";
import { Button, Card, Form, Input, Radio } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import style from "./question.module.scss";
import {
  BUTTON_ITEM_LAYOUT,
  classNames,
  FORM_ITEM_LAYOUT,
  FORM_ITEM_LAYOUT_WITHOUT_LABEL,
  QUESTION_TYPE,
} from "@/utils";
import { Visibility } from "@/components/visibility";
import { IQuestion, QuestionMode } from "@/types";

type ValidateStatus = Parameters<typeof Form.Item>[0]["validateStatus"];

interface IProps {
  question: IQuestion;
  otherQuestions: IQuestion[];
  setMode: (mode: QuestionMode) => void;
  onChange: (value: IQuestion) => void;
}

export const Edit: FC<IProps> = (props) => {
  const { question, otherQuestions, setMode, onChange } = props;
  const { index, type, options } = question;
  const form = Form.useFormInstance();
  const [questionType, setQuestionType] = useState(
    type ?? QUESTION_TYPE[0].value
  );
  const [title, setTitle] = useState(question.title);
  const [validateStatus, setValidateStatus] = useState<ValidateStatus>();
  const [titleErrmsg, setTitleErrmsg] = useState("");
  const [visibility, setVisibility] = useState(question.visibility);

  const save = () => {
    if (title.trim().length > 0) {
      form.validateFields().then(() => {
        const questionOptions = form.getFieldValue("question-options");
        onChange({
          ...question,
          options: questionOptions,
          title,
          type: questionType,
          visibility: visibility,
        });
        setMode("view");
      });
    } else {
      setValidateStatus("error");
      setTitleErrmsg("Title is requred");
    }
  };

  useEffect(() => {
    form.setFieldValue("question-options", options);
  }, [options, form]);

  const renderOption = () => {
    return (
      <Form.List
        name="question-options"
        rules={[
          {
            validator: async (_, options) => {
              if (
                (!options || options.length < 1) &&
                questionType !== "checkbox"
              ) {
                return Promise.reject(new Error("At least 1 option"));
              }
            },
          },
        ]}
        initialValue={options}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => {
              return (
                <Form.Item
                  {...(index === 0
                    ? FORM_ITEM_LAYOUT
                    : FORM_ITEM_LAYOUT_WITHOUT_LABEL)}
                  label={index === 0 ? "Options" : ""}
                  required={true}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input an option or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="input an option"
                      className={style["option-input"]}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className={style["operation-button-inner"]}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              );
            })}
            <Form.Item {...BUTTON_ITEM_LAYOUT}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add an option
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  };

  return (
    <div className="f-bs">
      <Card className={style.card} size="small">
        <div className={classNames("f-bs", style.view)}>
          <div className={style.index}>{index + 1}#</div>
          <div className={style.body}>
            <div className={classNames("f-cc", style.tabs)}>
              <Radio.Group
                value={questionType}
                onChange={(e) => {
                  setQuestionType(e.target.value);
                }}
                size="small"
                options={QUESTION_TYPE}
                optionType="button"
              />
            </div>
            <div className={style.form}>
              <Form.Item
                label="Title:"
                required
                validateStatus={validateStatus}
                help={titleErrmsg}
              >
                <Input
                  placeholder="input question title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (e.target.value.length > 0) {
                      setValidateStatus("success");
                      setTitleErrmsg("");
                    } else {
                      setValidateStatus("error");
                      setTitleErrmsg("Title is requred");
                    }
                  }}
                />
              </Form.Item>
              {index !== 0 ? (
                <Form.Item label="Visibility:">
                  <Visibility
                    questions={otherQuestions}
                    currentQuestionIndex={index}
                    value={visibility}
                    onChange={setVisibility}
                  />
                </Form.Item>
              ) : null}

              {questionType !== "checkbox" ? renderOption() : null}
            </div>
          </div>
        </div>
      </Card>
      <div className={classNames("fc-sc", style.operation)}>
        <CheckOutlined
          className={style["operation-button"]}
          title="Save"
          onClick={save}
        />
        <CloseOutlined
          className={style["operation-button"]}
          title="Cancel"
          onClick={() => {
            setMode("view");
          }}
        />
      </div>
    </div>
  );
};
