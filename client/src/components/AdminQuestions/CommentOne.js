import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'

const CommentOne =({questionNumber})=> {
  const {questions, setQuestions} = useContext(QuestionContext)
  const [question, setQuestion]=useState("Enter a comment:")

  useEffect(()=>{
    const newQuestionList = [...questions]
    newQuestionList[questionNumber]= {...newQuestionList[questionNumber],question, questionNumber, answerOptions:""} 
    setQuestions(newQuestionList)
    console.log('newQuestionlist:', questions)
  },[])
 
  return(
    <div className="question-component admin-question-component">
      <p className="question-intro">Q{questionNumber}.</p><span>
      <p className="question-intro">{question}</p></span>
      <textarea
        rows="4"
        cols="50"
        label="comment"
        placeholder="Input"
      />
    </div>
  );
}

export default CommentOne;
