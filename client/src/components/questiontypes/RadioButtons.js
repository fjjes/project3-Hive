import React, { useState, useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";

function RadioButtons({ questionNumber, question, texts }) {
  const { answers, setAnswers, setIsNextButtonDisabled, setValidationErrorMessage } =
    useContext(AnswerContext);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);

    let updateAnswers = { ...answers };
    updateAnswers[questionNumber] = e.target.value;
    setAnswers(updateAnswers);
  };

  useEffect(() => {
    setIsNextButtonDisabled(true);
    setValidationErrorMessage("Please select an option.")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(answers[questionNumber]);
    if (!answers[questionNumber]) {
      setIsNextButtonDisabled(true);
      setValidationErrorMessage("Please select an option.")
      console.log("setDisabled");
    } else {
      setIsNextButtonDisabled(false);
      setValidationErrorMessage("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (answers.length < questionNumber) {
      let updateAnswers = { ...answers };
      updateAnswers[questionNumber] = value;
      setAnswers(updateAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
		<div className="radio question-component user animate__animated animate__fadeIn">
      <p className="question-intro">Question {questionNumber}</p>
      <p className="question-intro">{question}</p>
      {texts.map((option, index) => {
        return (
          <div style={{paddingLeft: "10px"}} key={index}>
            <input
              type="radio"
              id={option}
              onChange={handleChange}
              name="option-group"
              value={option}
              checked={
                answers[questionNumber]
                  ? answers[questionNumber] === option
                  : false
              } 
              color="primary"
            />
            <label htmlFor={option}>{option}</label>
          </div>
        );
      })}
    </div>
  );
}
export default RadioButtons;
