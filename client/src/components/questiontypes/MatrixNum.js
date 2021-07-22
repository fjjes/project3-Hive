import React, { useState, useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";
import "../Form.css";

const MatrixNum = (props) => {
  const { answers, setAnswers, setIsNextButtonDisabled } =
    useContext(AnswerContext);
  const [values, setValues] = useState(props.texts);

  let columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const handleChange = (e, i) => {
    let newValues = [...values];
    newValues[i].value = e.target.value;
    setValues(newValues);

    let updateAnswers = { ...answers };
    updateAnswers[props.questionNumber] = newValues;
    setAnswers(updateAnswers);
  };

  useEffect(() => {
    //disables after one answer
    if (values !== props.texts) {
      setIsNextButtonDisabled(false);
      console.log("setDisabled");
    } else {
      setIsNextButtonDisabled(true);
    }
  }, [values]);

  useEffect(() => {
    if (answers.length < props.questionNumber) {
      let updateAnswers = { ...answers };
      updateAnswers[props.questionNumber] = values;
      setAnswers(updateAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="matrix question-component">
      <p className="question-intro">Q{props.questionNumber}.</p>
      <span>
        <p className="question-intro">{props.question}</p>
      </span>
      <table>
        <tbody>
          <tr>
            <th></th>
            {columns.map((cl, i) => {
              return (
                <th key={i}>
                  <label>{cl}</label>
                </th>
              );
            })}
          </tr>
          {values.map((row, i) => {
            return (
              <tr key={i}>
                <td className="label-rows">
                  <label>{row.text}</label>
                </td>
                {columns.map((col, index) => {
                  return (
                    <td key={index}>
                      <input
                        type="radio"
                        name={row.text}
                        value={col}
                        onChange={(e) => handleChange(e, i)}
                        checked={
                          answers[props.questionNumber]
                            ? answers[props.questionNumber][i].value === col
                            : false
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixNum;
