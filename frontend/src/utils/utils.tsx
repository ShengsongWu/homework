import { IQuestion } from '@/types';

export const classNames: (...args: string[]) => string = (...args) => {
  return [...args].join(' ');
};

export const createEmptyQuestion: (index: number) => IQuestion = (index) => {
  return {
    id: -1,
    index,
    type: 'checkbox',
    title: 'We have created a default title for you, edit it.'
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
  array.forEach((a) => {
    if (!comparedArray.find(a)) {
      return false;
    }
  });
  return true;
};
