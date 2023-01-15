import React from "react";
import { render, screen } from "@testing-library/react";
import { Form } from "antd";
import { View } from "./view";
import { IQuestion } from "@/types";

const question: IQuestion = {
  id: 4,
  index: 3,
  title: "444",
  type: "multiDropdown",
  options: ["option1", "option2"],
};

const questionRadio: IQuestion = {
  id: 4,
  index: 3,
  title: "444",
  type: "radio",
  options: ["option1", "option2"],
};

const questionCheckbox: IQuestion = {
  id: 4,
  index: 3,
  title: "444",
  type: "checkbox",
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
      <View question={question} setMode={() => {}} onDelete={() => {}} />
    </FormWrapper>
  );
  const ele = screen.getByText("444");
  expect(ele).toBeInTheDocument();
});

test("render checkbox", () => {
  render(
    <FormWrapper>
      <View
        question={questionCheckbox}
        setMode={() => {}}
        onDelete={() => {}}
      />
    </FormWrapper>
  );
  const ele = screen.getByRole("checkbox");
  expect(ele).toBeInTheDocument();
});

test("render radios", () => {
  render(
    <FormWrapper>
      <View question={questionRadio} setMode={() => {}} onDelete={() => {}} />
    </FormWrapper>
  );
  const ele = screen.getByDisplayValue("option2");
  expect(ele).toBeInTheDocument();
});
