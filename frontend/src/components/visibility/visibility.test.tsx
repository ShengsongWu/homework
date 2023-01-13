import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Visibility } from "./visibility";
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

test("renders always visible situation", () => {
  render(
    <Visibility currentQuestionIndex={1} questions={[]} onChange={() => {}} />
  );
  const ele = screen.getByText(/Always visible/i);
  expect(ele).toBeInTheDocument();
});

test("renders conditional situation", () => {
  render(
    <Visibility
      currentQuestionIndex={1}
      questions={[]}
      onChange={() => {}}
      value={{
        operatorType: "eq",
        questionIndex: 0,
        selectedOptions: ["abc"],
      }}
    />
  );
  const ele = screen.getByText(/Visible when/i);
  expect(ele).toBeInTheDocument();
});

test("list other questions", () => {
  render(
    <Visibility
      currentQuestionIndex={1}
      questions={questions}
      onChange={() => {}}
      value={{
        operatorType: "eq",
        questionIndex: 0,
        selectedOptions: ["abc"],
      }}
    />
  );
  const ele = screen.getAllByText(/\d#/i);
  expect(ele.length).toBe(1);
});

test("trigger type change", async () => {
  const onChange = jest.fn();
  render(
    <Visibility
      currentQuestionIndex={1}
      questions={questions}
      onChange={onChange}
      value={{
        operatorType: "eq",
        questionIndex: 0,
        selectedOptions: [],
      }}
    />
  );
  const typeSelect = screen.getAllByRole("combobox")[2];
  await userEvent.click(typeSelect);
  await screen.findByTitle(/in/);

  fireEvent.click(screen.getByTitle(/in/));
  expect(onChange).toBeCalledWith({
    operatorType: "in",
    questionIndex: 0,
    selectedOptions: [],
  });
});

test("trigger option change", async () => {
  const onChange = jest.fn();
  render(
    <Visibility
      currentQuestionIndex={1}
      questions={questions}
      onChange={onChange}
      value={{
        operatorType: "eq",
        questionIndex: 0,
        selectedOptions: [],
      }}
    />
  );
  const optionSelect = screen.getAllByRole("combobox")[3];
  await userEvent.click(optionSelect);
  await screen.findByTitle(/Unchecked/);

  fireEvent.click(screen.getByTitle(/Unchecked/));
  expect(onChange).toBeCalledWith({
    operatorType: "eq",
    questionIndex: 0,
    selectedOptions: ["unchecked"],
  });
});

test("trigger question change", async () => {
  const onChange = jest.fn();
  render(
    <Visibility
      currentQuestionIndex={3}
      questions={questions}
      onChange={onChange}
      value={{
        operatorType: "eq",
        questionIndex: 0,
        selectedOptions: [],
      }}
    />
  );
  const questionSelect = screen.getAllByRole("combobox")[1];
  await userEvent.click(questionSelect);
  await screen.findAllByTitle(/1#/);

  fireEvent.click(screen.getAllByTitle(/2#/)[0]);
  expect(onChange).toBeCalledWith({
    operatorType: "eq",
    questionIndex: 1,
    selectedOptions: [],
  });
});
