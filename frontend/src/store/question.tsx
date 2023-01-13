import { IQuestion, UniformResponse } from "@/types";

export const getQuestions: (formId: number) => Promise<IQuestion[]> = (
  formId
) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/question/form/${formId}`)
      .then<UniformResponse<IQuestion[]>>((r) => r.json())
      .then((json) => {
        if (json.statusCode === 200) {
          resolve(json.data!);
        } else {
          reject();
        }
      });
  });
};
