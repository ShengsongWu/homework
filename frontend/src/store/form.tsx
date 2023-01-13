import { IForm, UniformResponse } from "@/types";

export const getForms: (
  page: number,
  size: number
) => Promise<{
  data: IForm[];
  total: number;
}> = (page, size) => {
  return new Promise((resolve, reject) => {
    fetch(`/form/page/${page}/${size}`)
      .then<
        UniformResponse<{
          data: IForm[];
          total: number;
        }>
      >((r) => r.json())
      .then((json) => {
        if (json.statusCode === 200) {
          setTimeout(() => {
            resolve(json.data!);
          }, 1000);
        } else {
          reject();
        }
      });
  });
};

export const getOneForm: (id: number) => Promise<IForm | undefined> = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`/form/${id}`)
      .then<UniformResponse<IForm>>((r) => r.json())
      .then((json) => {
        if (json.statusCode === 200) {
          resolve(json.data!);
        } else {
          reject();
        }
      });
  });
};

export const updateForm: (form: IForm) => Promise<boolean> = (form) => {
  return new Promise((resolve, reject) => {
    fetch("/form", {
      method: "PUT",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then<UniformResponse<IForm>>((r) => r.json())
      .then((json) => {
        if (json.statusCode === 200) {
          resolve(true);
        } else {
          reject(false);
        }
      });
  });
};

export const createForm: (form: IForm) => Promise<boolean> = (form) => {
  return new Promise((resolve, reject) => {
    fetch("/form", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then<UniformResponse<IForm>>((r) => r.json())
      .then((json) => {
        if (json.statusCode === 200) {
          resolve(true);
        } else {
          reject(false);
        }
      });
  });
};

export const deleteForm: (id: number) => Promise<boolean> = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`/form/${id}`, {
      method: "DELETE",
    })
      .then<UniformResponse<IForm>>((r) => r.json())
      .then((json) => {
        if (json.statusCode === 200) {
          resolve(true);
        } else {
          reject(false);
        }
      });
  });
};
