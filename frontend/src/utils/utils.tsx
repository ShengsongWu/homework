import { IQuestion } from "@/types";

export const classNames: (...args: string[]) => string = (...args) => {
  return [...args].join(" ");
};

export const createEmptyQuestion: (index: number) => IQuestion = (index) => {
  return {
    index,
    type: "checkbox",
    title: "",
  };
};

/**
 * check whether an array's value are all contained by another one
 * for example. we say ['1','2'] is contained by ['1','2','3'] but
 * not contained by ['1','3']
 * @param array source array
 * @param comparedArray to be compared array
 */
export const arrayContain = (array: Array<any>, comparedArray: Array<any>) => {
  for (let i = 0; i < array.length; i++) {
    const a = array[i];
    if (comparedArray.indexOf(a) === -1) {
      return false;
    }
  }
  return true;
};
