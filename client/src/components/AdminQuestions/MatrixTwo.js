import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'
import MatrixNum from '../questiontypes/MatrixNum'

const MatrixTwo = ({questionNumber}) => {
    const {questions, setQuestions} = useContext(QuestionContext)
    const [question, setQuestion]=useState("Please rate the importance of followings from 1 to 10:")
    const [answerOptions, setAnswerOptions]=useState([
        {text: "text 1"},
        {text: "text 2"},
        {text: "text 3"},
        {text: "text 4"},
        {text: "text 5"}
    ])

    useEffect(()=>{
        const newQuestionList = [...questions]
        newQuestionList[questionNumber]= {...newQuestionList[questionNumber],question, questionNumber, answerOptions} 
        setQuestions(newQuestionList)
    },[])

    return (
        <div className="question-component admin-question-component">
            <MatrixNum 
                question={question}
                questionNumber={questionNumber}
                texts={answerOptions}
            />
        </div>
    );
}
 
export default MatrixTwo;