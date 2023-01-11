import React, { FC, useState, useEffect } from 'react';
import { Button, Spin, Form as AntForm } from 'antd';
import { Layout } from '@/components/layout';
import { useParams } from 'react-router-dom';
import { getOneForm } from '@/store';
import { IForm, IQuestion } from '@/types';
import style from './form.module.scss';
import { arrayContain, classNames } from '@/utils';
import { Question } from '@/components/question';

export const Form: FC = () => {
  const { id } = useParams();
  const [form, setForm] = useState<IForm>();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<string[][]>(form?.questions?.map((x) => []) ?? []);
  const [visibilities, setVisibilities] = useState<boolean[]>(
    form?.questions?.map((x) => true) ?? []
  );
  const antForm = AntForm.useForm()[0];

  const loadData = () => {
    setLoading(true);
    getOneForm(parseInt(id ?? '')).then((data) => {
      setLoading(false);
      if (data) {
        setForm(data);
        setValues(data.questions?.map((x) => []));
        setVisibilities(data.questions?.map((x) => true));
      }
    });
  };

  const checkVisible = (q: IQuestion, values: string[][]) => {
    if (!q.visibility) {
      return true;
    } else {
      const relyQuestionValue = values[q.visibility.questionIndex];
      if (q.visibility.operatorType === 'eq') {
        if (q.visibility.selectedOptions?.[0] === relyQuestionValue[0]) {
          return true;
        }
      } else {
        if (arrayContain(relyQuestionValue, q.visibility.selectedOptions ?? [])) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form?.questions?.length) {
      setVisibilities(form?.questions.map((q, i) => checkVisible(q, values)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, form?.questions]);

  const filteredQuestions = form?.questions.filter((q, i) => visibilities[i]) ?? [];

  return (
    <Layout title="Form" showBack>
      {loading || !form ? (
        <div className={classNames('f-cc', style.loading)}>
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
                  currentEditIndex={-1}
                  isPublic
                  onInteract={(v) => {
                    const nextValues = values.map((x, idx) => (idx === q.index ? v : x));
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
                window.alert('Thank you for your time!');
              }}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};
