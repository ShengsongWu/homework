import React from "react";
import { render, screen } from "@testing-library/react";
import { Form } from "antd";
import { Edit } from "./edit";
import { IQuestion } from "@/types";

const questions: IQuestion[] = [
  {
    id: 1,
    index: 0,
    title: "111",
    type: "checkbox",
  },
  {
    id: 2,
    index: 1,
    title: "222",
    type: "radio",
    options: ["option1", "option2"],
  },
  {
    id: 3,
    index: 2,
    title: "333",
    type: "multiDropdown",
    options: ["option1", "option2"],
  },
  {
    id: 4,
    index: 3,
    title: "444",
    type: "multiDropdown",
    options: ["option1", "option2"],
  },
];

const question: IQuestion = {
  id: 4,
  index: 3,
  title: "444",
  type: "multiDropdown",
  options: ["option1", "option2"],
};

const FormWrapper = (props: any) => {
  const [form] = Form.useForm();
  return (
    <Form layout={"horizontal"} form={form} size="small" labelCol={{ span: 4 }}>
      {props.children}
    </Form>
  );
};

beforeAll(() => {
  global.matchMedia =
    global.matchMedia ||
    function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    };
});

test("render basic components", () => {
  render(
    <FormWrapper>
      <Edit
        question={question}
        otherQuestions={questions}
        setMode={() => {}}
        onChange={() => {}}
      />
    </FormWrapper>
  );
  const ele = screen.getByPlaceholderText("input question title");
  expect(ele).toBeInTheDocument();
});

test("render question types", () => {
  render(
    <FormWrapper>
      <Edit
        question={question}
        otherQuestions={questions}
        setMode={() => {}}
        onChange={() => {}}
      />
    </FormWrapper>
  );
  let ele = screen.getByText("Checkbox");
  expect(ele).toBeInTheDocument();
  ele = screen.getByText("Radio buttons");
  expect(ele).toBeInTheDocument();
  ele = screen.getByText("Multiple-dropdown");
  expect(ele).toBeInTheDocument();
});

test("render options", () => {
  render(
    <FormWrapper>
      <Edit
        question={question}
        otherQuestions={questions}
        setMode={() => {}}
        onChange={() => {}}
      />
    </FormWrapper>
  );
  const ele = screen.getByText("Options");
  expect(ele).toBeInTheDocument();
});
test("render save", async () => {
  const save = jest.fn();
  render(
    <FormWrapper>
      <Edit
        question={question}
        otherQuestions={questions}
        setMode={save}
        onChange={save}
      />
    </FormWrapper>
  );
  const ele = screen.getByTitle("Save");
  expect(ele).toBeInTheDocument();
});
