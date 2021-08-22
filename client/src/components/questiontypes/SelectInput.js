import React, { useState, useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";
import "../Form.css";

const SelectInput = (props) => {
  const { answers, setAnswers, setIsNextButtonDisabled, setValidationErrorMessage } =
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
    if (setIsNextButtonDisabled == null) return;
    console.log(values);
    var allHaveValues = true;
    for (var i in values) {
      var value = values[i];
      if (value.value == null) {
        allHaveValues = false;
      }
    }
    if (allHaveValues) {
      setIsNextButtonDisabled(false);
      setValidationErrorMessage("")
      // console.log("setDisabled");
    } else {
      setIsNextButtonDisabled(true);
      setValidationErrorMessage("Please select one option from each row.")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
		<div className="select question-component user animate__animated animate__fadeIn">
      <p className="question-intro">Question {props.questionNumber}</p>
      <p className="question-intro">{props.question}</p>
      {values.map((row, i) => {
        return (
          <ul key={i}>
            <li
              style={{
                listStyleType: "none",
                textAlign: "left",
                marginLeft: "30px",
              }}
            >
              {row.text}:&nbsp;
              <select value={row.value} onChange={(e) => handleChange(e, i)}>
                <option>Select</option>
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
