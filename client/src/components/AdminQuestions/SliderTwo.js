import React, { useState, useContext, useEffect } from "react";
import { QuestionContext } from "../pages/Admin/NewSurvey";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as RiIcons from "react-icons/ri";

const SliderTwo = ({question}) => {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [questionText, setQuestionText]=useState(question.question || "Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%.")
  const [answerOptions, setAnswerOptions]=useState(question.answerOptions ||
    [
    "Home",
    "Traveling",
    "At the office",
    "In the client's office",
    "Elsewhere",
  ]);

  const onDelete = (e) => {
    e.preventDefault();
    questions.splice(question.questionNumber - 1, 1);
    const deleteQuestion = [...questions];
    setQuestions(deleteQuestion);
  };

  useEffect(() => {
    const newQuestionList = [...questions];
    newQuestionList[question.questionNumber - 1] = {
      ...newQuestionList[question.questionNumber - 1],
      question:questionText,
      // questionNumber,
      answerOptions,
    };
    setQuestions(newQuestionList);
  }, []);

  return (
    <div className="question-component admin-question-component">
      <button style={{ float: "right", width: "43px" }} onClick={onDelete}>
        <RiIcons.RiDeleteBinFill />
      </button>
      <p className="question-intro">Q{question.questionNumber}.</p>
      <span>
        <p className="question-intro">{questionText}</p>
      </span>
      {answerOptions.map((row, index) => {
        return (
          <div key={index} className="slider">
            <p>{row}</p>
            <Slider
              ariaLabelledbyForHandle="input-slider"
              step={5}
              min={0}
              max={100}
            />
            <input
              className="input"
              type="number"
              step={5}
              min={0}
              max={100}
              aria-labelledby="input-slider"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SliderTwo;
