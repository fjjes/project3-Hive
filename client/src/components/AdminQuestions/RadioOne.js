import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'
import RadioButtons from "../questiontypes/RadioButtons"

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
        newQuestionList[questionNumber]= {...newQuestionList[questionNumber],question, questionNumber, answerOptions} 
        setQuestions(newQuestionList)
    },[])

    return (
        <div className="radio-one question-component admin-question-component">
            <RadioButtons
            question={question}
            questionNumber={questionNumber}
            texts={answerOptions}
            />
        </div>
    );
}
 
export default RadioOne;