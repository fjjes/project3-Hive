import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SliderTwo = ({questionNumber}) => {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [question, setQuestion]=useState("Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%.")
  const [answerOptions, setAnswerOptions]=useState([
    "Home",
    "Traveling",
    "At the office",
    "In the client's office",
    "Elsewhere"
  ])

  useEffect(()=>{
    const newQuestionList = [...questions]
    newQuestionList[questionNumber]= {...newQuestionList[questionNumber],question, questionNumber, answerOptions} 
    setQuestions(newQuestionList)
  },[])

  return (
    <div className="question-component admin-question-component">
      <p className="question-intro">Q{questionNumber}.</p>
        <span><p className="question-intro">{question}</p></span>
        {answerOptions.map((row, index)=>{
          return(
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
          )
        })}
    </div>
  );
};

export default SliderTwo;





