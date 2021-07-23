import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'

const RadioOne = ({questionNumber}) => {
    const {questions, setQuestions} = useContext(QuestionContext)
    const [question, setQuestion]=useState("What is your department or team?")
    const [answerOptions, setAnswerOptions]=useState([
        'Option1',
        'Option2',
        'Option3',
        'Option4',
        'Option5',
        'Option6',
        'Option7',
        'Option8'
    ])
    
    useEffect(()=>{
        const newQuestionList = [...questions]
        newQuestionList[questionNumber-1]= {...newQuestionList[questionNumber-1],question, questionNumber, answerOptions} 
        setQuestions(newQuestionList)
    },[])

    return (
    <div className="radio-one question-component admin-question-component">
      <p className="question-intro">Q{questionNumber}.</p>
      <span><p className="question-intro">{question}</p></span>
      {answerOptions.map((option, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              id={option}
              name="option-group"
            //   value={option}
              color="primary"
            />
            <label htmlFor={option}>{option}</label>
          </div>
        );
    })}
    </div>
    );
}
 
export default RadioOne;