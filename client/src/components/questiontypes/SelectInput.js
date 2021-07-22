import React, { useState, useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";
import "../Form.css";

const SelectInput = (props) => {
  const { answers, setAnswers, setIsNextButtonDisabled } =
    useContext(AnswerContext);
  const [values, setValues] = useState(props.texts);

  let selectArray = [];
  let num = 1;
  for (let i = 0; i < values.length; i++) {
    selectArray.push(num++);
  }

  const handleChange = (e, i) => {
    let newValues = [...values];
    newValues[i].value = parseInt(e.target.value);
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
    <div className="select question-component">
      <p className="question-intro">Q{props.questionNumber}.</p>
      <span>
        <p className="question-intro">{props.question}</p>
      </span>
      {values.map((row, i) => {
        return (
          <ul key={i}>
            <li style={{ listStyleType: "none", textAlign: "left" }}>
              {row.text}:&nbsp;
              <select value={row.value} onChange={(e) => handleChange(e, i)}>
                <option>--Select--</option>
                {selectArray.map((selection, index) => {
                  const isAnswerAlreadyChosen = answers[
                    props.questionNumber
                  ]?.find((answer) => answer.value === selection);
                  const isAnswerForThisRow = answers[props.questionNumber]
                    ? answers[props.questionNumber][i].value === selection
                    : false;
                  let disabled = false;
                  if (isAnswerAlreadyChosen && !isAnswerForThisRow) {
                    disabled = true;
                  }
                  return (
                    <option key={index} disabled={disabled} value={selection}>
                      {selection}
                    </option>
                  );
                })}
              </select>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default SelectInput;
