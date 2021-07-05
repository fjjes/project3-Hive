import React,{ useEffect, useState }  from "react"
import SelectInput from './questiontypes/SelectInput'
import Slider from './questiontypes/Slider'
import Comment from "./questiontypes/Comment";
import RadioButtons from "./questiontypes/RadioButtons";
import Checkboxes from "./questiontypes/Checkboxes";
import Matrix from "./questiontypes/Matrix";
import MatrixNum from "./questiontypes/MatrixNum";
import './Form.css'

const SurveyQuestion = ({questionBlock}) => {
    const question= questionBlock?.question //if questionBlock is defined, set question to be questionBlock.question, otherwise set it as undefined
    const texts = questionBlock?.answerOptions
    const questionNumber=questionBlock?.questionNumber
    const questionType= questionBlock?.questionType
    
   
    return (
        <div className="survey-question">
                {questionType === 'checkbox' && <Checkboxes question={question} texts={texts} questionNumber={questionNumber}/>}
                {questionType === 'radio' && <RadioButtons question={question} texts={texts} questionNumber={questionNumber}/>}
                {questionType === 'select' && <SelectInput question={question} texts={texts} questionNumber={questionNumber}/>}
                {questionType === 'slider' && <Slider question={question} texts={texts} questionNumber={questionNumber}/>}
                {questionType === 'matrix1' && <Matrix question={question} texts={texts} questionNumber={questionNumber}/>}
                {questionType === 'matrix2' && <MatrixNum question={question} texts={texts} questionNumber={questionNumber}/>}
                {questionType === 'comment' && <Comment question={question} questionNumber={questionNumber} />}      
        </div>
    );
}
 
export default SurveyQuestion;



// useEffect(()=>{
    //     const pickQuestion =()=>{
    //         if(questionNumber===1){
    //             setCurrentQuestion(<SelectOne 
    //                                 questionNumber={1}
    //                                 />)
    //         }else if(questionNumber === 2){
    //             setCurrentQuestion(<Slider 
    //                                 questionNumber={2}
    //                                 />)
    //         }else if(questionNumber === 3){
    //             setCurrentQuestion(<RadioButtons 
    //                                 questionNumber={3}
    //                                 />)
    //         }else if(questionNumber === 4){
    //             setCurrentQuestion(<Checkboxes 
    //                                 questionNumber={4}
    //                                 />)
    //         }else if(questionNumber === 5){
    //             setCurrentQuestion(<MatrixOne 
    //                                 questionNumber={5}
    //                                 onChangedValues={(values)=>setMatrixOneValues(values)}
    //                                 matrixOneValues={matrixOneValues}
    //                                 />)
    //         }else if(questionNumber === 6){
    //             setCurrentQuestion(<MatrixTwo 
    //                                 questionNumber={6}
    //                                 onChangedValues={(values)=>setMatrixTwoValues(values)}
    //                                 matrixTwoValues={matrixTwoValues}
    //                                 />)
    //         }else if(questionNumber === 7){
    //             setCurrentQuestion(<Comment 
    //                                 questionNumber={7}
    //                                 />)
    //         }
    //     }
    //     pickQuestion()
    // },[questionNumber, matrixOneValues, matrixTwoValues])