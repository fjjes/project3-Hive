import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'
import SelectInput from "../questiontypes/SelectInput";

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

  useEffect(()=>{
      const newQuestionList = [...questions]
      newQuestionList[questionNumber]= {...newQuestionList[questionNumber],question, questionNumber, answerOptions} 
      setQuestions(newQuestionList)
  },[])

    return (
        <div className="selectOne question-component admin-question-component">
          <SelectInput
            question = {question}
            questionNumber={questionNumber}
            texts = {answerOptions}
          />
        </div>
    );
}
 
export default SelectOne;

