import React, { FC } from "react";
import {
  Card,
  Checkbox,
  Form,
  Popconfirm,
  Radio,
  RadioChangeEvent,
  Select,
} from "antd";
import { EditOutlined, MinusCircleOutlined } from "@ant-design/icons";
import style from "./question.module.scss";
import { CHECKBOX_OPTIONS, classNames } from "@/utils";
import { IQuestion, QuestionMode } from "@/types";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface IProps {
  question: IQuestion;
  setMode: (mode: QuestionMode) => void;
  disabled?: boolean;
  onDelete: (index: number) => void;
  isPublic?: boolean;
  onInteract?: (values: string[]) => void;
  listIndex?: number;
}

export const View: FC<IProps> = (props) => {
  const {
    question: { index, title, type, options },
    setMode,
    disabled,
    onDelete,
    isPublic,
    onInteract,
    listIndex,
  } = props;

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onInteract?.([CHECKBOX_OPTIONS[0].value]);
    } else {
      onInteract?.([CHECKBOX_OPTIONS[1].value]);
    }
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    onInteract?.([e.target.value]);
  };

  const onMultiSelectChange = (values: string[]) => {
    onInteract?.(values);
  };

  const renderOption = () => {
    if (type === "checkbox") {
      return (
        <Form.Item valuePropName="checked" className={style.options}>
          <Checkbox disabled={disabled} onChange={onCheckboxChange}></Checkbox>
        </Form.Item>
      );
    } else if (type === "radio") {
      return (
        <Form.Item className={style.options}>
          <Radio.Group
            disabled={disabled}
            options={options?.map((o) => ({ label: o, value: o }))}
            onChange={onRadioChange}
          />
        </Form.Item>
      );
    } else {
      return (
        <Form.Item className={style.options}>
          <Select
            mode="multiple"
            disabled={disabled}
            allowClear
            placeholder="Please select"
            options={options?.map((o) => ({ label: o, value: o }))}
            onChange={onMultiSelectChange}
          />
        </Form.Item>
      );
    }
  };
  return (
    <div className="f-bs" data-testid="view">
      <Card className={style.card} size="small">
        <div className={classNames("f-bs", style.view)}>
          <div className={style.index}>{(listIndex ?? index) + 1}#</div>
          <div className={style.body}>
            <div className={style.title}>{title}</div>
            <div>{renderOption()}</div>
          </div>
        </div>
      </Card>
      {!isPublic ? (
        <div className={classNames("fc-sc", style.operation)}>
          <EditOutlined
            className={classNames(
              style["operation-button"],
              disabled ? style["disabled"] : ""
            )}
            title="Edit"
            onClick={() => {
              setMode("edit");
            }}
          />
          <Popconfirm
            title="Delete the question"
            description="Are you sure to delete this question?"
            onConfirm={() => {
              onDelete(index);
            }}
            placement="topRight"
            okText="Yes"
            cancelText="No"
          >
            <MinusCircleOutlined
              className={classNames(
                style["operation-button"],
                disabled ? style["disabled"] : ""
              )}
              title="Delete"
            />
          </Popconfirm>
        </div>
      ) : null}
    </div>
  );
};
