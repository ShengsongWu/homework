import { IForm, IQuestion } from '@/types';

const range = [];
for (let i = 0; i < 30; i++) {
  range.push(i);
}

const questions: IQuestion[] = [
  {
    id: 1,
    index: 0,
    title: `Can you tell me what's your name?
      You would better tell me, or I will ask other people.
      If they don't tell me too, I will ask you again. 
      Don't you think it is a trouble?`,
    type: 'checkbox'
  },
  {
    id: 2,
    index: 1,
    title: `select one of your favorite hobbies`,
    type: 'radio',
    options: ['soccer', 'basketball', 'reading', 'writing', 'shooting', 'sing'],
    visibility: {
      operatorType: 'eq',
      questionIndex: 0,
      selectedOptions: ['checked']
    }
  },
  {
    id: 3,
    index: 2,
    title: `The following countries, which belong to Asia?`,
    type: 'multiDropdown',
    options: ['China', 'Japan', 'England', 'USA', 'Russia', 'AGT']
  },
  {
    id: 4,
    index: 3,
    title: `This is another question`,
    type: 'radio',
    options: ['option1', 'option2', 'option3'],
    visibility: {
      operatorType: 'eq',
      questionIndex: 1,
      selectedOptions: ['basketball']
    }
  }
];

const forms: IForm[] = range.map((r) => ({
  id: r,
  title: `The following countries, which belong to Asia?The following countries, which belong to Asia?The following countries, which belong to Asia?The following countries, which belong to Asia? form ${r}`,
  questions
}));

export const getForms: () => Promise<IForm[]> = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(forms);
    }, 2000);
  });
};

export const getOneForm: (id: number) => Promise<IForm | undefined> = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(forms.find((x) => x.id === id));
    }, 200);
  });
};

export const updateForm: (form: IForm) => Promise<boolean> = (form) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export const createForm: (form: IForm) => Promise<boolean> = (form) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};
