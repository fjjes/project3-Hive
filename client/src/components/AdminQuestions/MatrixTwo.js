import React, { useState, useContext, useEffect } from 'react';
import { QuestionContext } from '../pages/Admin/NewSurvey'

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

    const [columns, setColumns]=useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])

    useEffect(()=>{
        const newQuestionList = [...questions]
        newQuestionList[questionNumber]= {...newQuestionList[questionNumber],question, questionNumber, answerOptions} 
        setQuestions(newQuestionList)
    },[])

    return (
        <div className="question-component admin-question-component">
        <p className="question-intro">Q{questionNumber}.</p>
        <span>
            <p className="question-intro">{question}</p>
        </span>
        <table>
            <tbody>
            <tr>
                {/* removing this empty <th></th> will mess up the layout of matrix labels */}
                <th></th>
                {columns.map((cl, i) => {
                return (
                    <th key={i}>
                    <label>{cl}</label>
                    </th>
                );
                })}
            </tr>
            {answerOptions.map((row, i) => {
                return (
                <tr key={i}>
                    <td className="label-rows">
                    <label>{row.text}</label>
                    </td>
                    {columns.map((col, index) => {
                    return (
                        <td key={index}>
                        <input
                            type="radio"
                            name={row.text}
                            value={col}
                        />
                        </td>
                    );
                    })}
                </tr>
                );
            })}
            </tbody>
        </table>
    </div>
    );
}
 
export default MatrixTwo;