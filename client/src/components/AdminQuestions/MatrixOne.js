import React, { useState, useContext, useEffect} from 'react';
import Matrix from '../questiontypes/Matrix'
import { QuestionContext } from '../pages/Admin/NewSurvey'

const MatrixOne = ({questionNumber}) => {
    const {questions, setQuestions} = useContext(QuestionContext)
    const [question, setQuestion]=useState('Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:')
    const [answerOptions, setAnswerOptions]=useState([
        {text: "Ability to concentrate" },
        {text: "Ability to conduct telephone conversations"},
        {text: "Ability to find a meeting room within a reasonable timeframe"},
        {text: "Ability to access collaborative spaces for informal exchanges with my colleagues"},
        {text: "Ability to conduct confidential conversations" },
        {text: "Quality of IT and telephone tools (excluding workstations) made available (connection tools and screens in meeting rooms, etc.)"},
        {text: "Ability to work in the office with remote contacts"},
        {text: "Ability to easily switch between face-to-face work and work at home"},
        {text: "Quality of the environment near my workplace (neighborhood, shops, services, restaurants, etc.)"}
    ])

    useEffect(()=>{
        const newQuestionList = [...questions]
        newQuestionList[questionNumber]= {...newQuestionList[questionNumber],question, questionNumber, answerOptions} //!!!!!!!!!!!!!!
        setQuestions(newQuestionList)
    },[])

    return (
        <div className="question-component admin-question-component">
            <Matrix
                question={question}
                questionNumber={questionNumber}
                texts={answerOptions}  
            />
        </div>
    );
}
 
export default MatrixOne;