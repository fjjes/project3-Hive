import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'


function CheckboxesOne({questionNumber}) {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [question, setQuestion]=useState("Select up to three options:")
  const [answerOptions, setAnswerOptions]=useState([
  //   { checked: false, value: "Option 1" },
  //   { checked: false, value: "Option 2" },
  //   { checked: false, value: "Option 3" },
  //   { checked: false, value: "Option 4" },
  //   { checked: false, value: "Option 5" },
  //   { checked: false, value: "Option 6" },
  //   { checked: false, value: "Option 7" },
  //   { checked: false, value: "Option 8" },
  // ])
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8"])

  useEffect(()=>{
    const newQuestionList = [...questions]
    console.log('newQuestionList', questions)
    console.log('questionNumber', questionNumber)
    newQuestionList[questionNumber-1]= {...newQuestionList[questionNumber-1],question, answerOptions} 
    console.log('questions line 23:', newQuestionList )
    setQuestions(newQuestionList)
},[])
  
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
                value={option}
              />
              <label
                htmlFor={option}
                key={option}
              >
                {option}
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
