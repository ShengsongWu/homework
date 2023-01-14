import React from "react";
import { render, screen } from "@testing-library/react";
import { Form } from "antd";
import { Question } from "./question";
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
      <Question value={question} otherQuestions={questions} />
    </FormWrapper>
  );
  const ele = screen.getByTestId("view");
  expect(ele).toBeInTheDocument();
});

test("render edit components", () => {
  const { id, ...noId } = question;
  render(
    <FormWrapper>
      <Question value={noId} otherQuestions={questions} />
    </FormWrapper>
  );
  const ele = screen.getByTestId("edit");
  expect(ele).toBeInTheDocument();
});
