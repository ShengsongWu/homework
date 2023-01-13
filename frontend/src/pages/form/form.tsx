import React, { FC, useState, useEffect, useCallback } from "react";
import { Button, Spin, Form as AntForm } from "antd";
import { Layout } from "@/components/layout";
import { useParams } from "react-router-dom";
import { getOneForm, getQuestions } from "@/store";
import { IForm, IQuestion } from "@/types";
import style from "./form.module.scss";
import { arrayContain, classNames } from "@/utils";
import { Question } from "@/components/question";

export const Form: FC = () => {
  const { id } = useParams();
  const [form, setForm] = useState<IForm>();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<string[][]>(
    form?.questions?.map((x) => []) ?? []
  );
  const [visibilities, setVisibilities] = useState<boolean[]>(
    form?.questions?.map((x) => true) ?? []
  );
  const antForm = AntForm.useForm()[0];

  const loadData = useCallback(async () => {
    setLoading(true);
    const data = await getOneForm(parseInt(id ?? ""));

    if (data?.id) {
      const questions = await getQuestions(data.id);
      data.questions = questions;
      setLoading(false);
      setForm(data);
      setValues(
        data.questions?.map((x) => (x.type === "checkbox" ? ["unchecked"] : []))
      );
      setVisibilities(data.questions?.map((x) => true));
    }
  }, [id]);

  const checkVisible = (q: IQuestion, values: string[][]) => {
    if (!q.visibility || !q.visibility.selectedOptions?.length) {
      return true;
    } else {
      const relyQuestionValue = values[q.visibility.questionIndex];
      if (q.visibility.operatorType === "eq") {
        if (q.visibility.selectedOptions?.[0] === relyQuestionValue[0]) {
          return true;
        }
      } else {
        if (
          arrayContain(relyQuestionValue, q.visibility.selectedOptions ?? [])
        ) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    if (!form && !loading) {
      console.log("l");

      loadData();
    }
  }, [form, loadData, loading]);

  useEffect(() => {
    if (form?.questions?.length) {
      setVisibilities(form?.questions.map((q, i) => checkVisible(q, values)));
    }
  }, [values, form?.questions]);

  const filteredQuestions =
    form?.questions?.filter((q, i) => visibilities[i]) ?? [];

  return (
    <Layout title="Form" showBack>
      {loading || !form ? (
        <div className={classNames("f-cc", style.loading)}>
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <div className={style.title}>{form.title}</div>
          <div>
            <AntForm form={antForm}>
              {filteredQuestions.map((q, i) => (
                <Question
                  otherQuestions={form.questions.filter((o) => o.index !== i)}
                  value={q}
                  key={q.index}
                  currentEditIndex={undefined}
                  isPublic
                  onInteract={(v) => {
                    const nextValues = values.map((x, idx) =>
                      idx === q.index ? v : x
                    );
                    // find rely questions
                    const relyQuestions = (form?.questions ?? []).filter(
                      (x) => x?.visibility?.questionIndex === q.index
                    );
                    // check visible and set value to [] if not visible
                    relyQuestions.forEach((rely) => {
                      if (!checkVisible(rely, nextValues)) {
                        nextValues[rely.index] = [];
                      }
                    });
                    setValues(nextValues);
                  }}
                  listIndex={i}
                />
              ))}
            </AntForm>
          </div>
          <div className="f-cc">
            <Button
              type="primary"
              onClick={() => {
                window.alert("Thank you for your time!");
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};
