import React, { useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";

const Comment = ({ questionNumber, question }) => {
  const { answers, setAnswers, setIsNextButtonDisabled, setValidationErrorMessage } =
    useContext(AnswerContext);
  
  setValidationErrorMessage("")

  const handleChange = (e) => {
    let updateAnswers = { ...answers };
    updateAnswers[questionNumber] = e.target.value;
    setAnswers(updateAnswers);
  };

  useEffect(() => {
    setIsNextButtonDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="question-component">
      <p className="question-intro">Q{questionNumber}.</p>
      <span>
        <p className="question-intro">{question}</p>
      </span>
      <textarea
        style={{ marginLeft: "90px" }}
        rows="4"
        cols="50"
        label="comment"
        value={answers[questionNumber]}
        onChange={handleChange}
        placeholder="Comments"
      />
    </div>
  );
};

export default Comment;
