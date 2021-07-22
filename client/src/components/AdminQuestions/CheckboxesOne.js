import React, { useState, useContext } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'

// const texts=[
//   { checked: false, value: "Option 1" },
//   { checked: false, value: "Option 2" },
//   { checked: false, value: "Option 3" },
//   { checked: false, value: "Option 4" },
//   { checked: false, value: "Option 5" },
//   { checked: false, value: "Option 6" },
//   { checked: false, value: "Option 7" },
//   { checked: false, value: "Option 8" },
// ]

//const question = "Select up to three options:"

function CheckboxesOne({questionNumber}) {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [question, setQuestion]=useState("Select up to three options:")
  const [answerOptions, setAnswerOptions]=useState([
    { checked: false, value: "Option 1" },
    { checked: false, value: "Option 2" },
    { checked: false, value: "Option 3" },
    { checked: false, value: "Option 4" },
    { checked: false, value: "Option 5" },
    { checked: false, value: "Option 6" },
    { checked: false, value: "Option 7" },
    { checked: false, value: "Option 8" },
  ])

  const newQuestionList = [...questions]
  newQuestionList[questionNumber]= {question:question, answerOptions:answerOptions}  //!!!!!!!!!!!!!!!!!!
  setQuestions(newQuestionList)
  
  return (
    <div className="question-component admin-question-component">
      <form className="checkbox-form-control">
        <p className="question-intro">Q{questionNumber}.</p><span>
        <p className="question-intro">{question}</p></span>
        <div className="checkbox-form-group">
          {answerOptions.map((option, index) => {
            return(<div key={index}>
              <input
                type="checkbox"
                name="option"
                // id={option.value}
                value={option.value}
              />
              <label
                htmlFor={option.value}
                key={option.value}
              >
                {option.value}
              </label>
            </div>
            )})
        }
        </div>
      </form>
    </div>
  );
}

export default CheckboxesOne;
