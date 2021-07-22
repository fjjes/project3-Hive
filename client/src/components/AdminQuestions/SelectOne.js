import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'

const SelectOne = ({ questionNumber}) => {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [question, setQuestion]=useState("In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many Answers are possible.\nPlease rank the following in order of interest:")
  const [answerOptions, setAnswerOptions]=useState([
    {text:'Rethinking workspaces in the company'},
    {text:'Review the organization of meetings Rethinking moments'},
    {text:'Spaces of conviviality'},
    {text:'Do not change anything'},
    {text:'Other'}
  ])

  let selectArray = [];
  let num = 1;
  for (let i = 0; i < answerOptions.length; i++) {
    selectArray.push(num++);
  }

  useEffect(()=>{
      const newQuestionList = [...questions]
      newQuestionList[questionNumber]= {...newQuestionList[questionNumber],question, questionNumber, answerOptions} 
      setQuestions(newQuestionList)
  },[])

    return (       
      <div className="selectOne question-component admin-question-component">
      <p className="question-intro">Q{questionNumber}.</p>
      <span><p className="question-intro">{question}</p></span>
      {answerOptions.map((row, i) => {
        return (
          <ul key={i}>
            <li style={{ listStyleType: "none", textAlign: "left" }}>
              {row.text}:&nbsp;
              <select value={row.value}>
                <option>--Select--</option>
                {selectArray.map((selection, index) => {
                  return (
                    <option key={index} value={selection}>{selection}</option>
                  );
                })}
              </select>
            </li>
          </ul>
        );
      })}
    </div>
    );
}
 
export default SelectOne;

