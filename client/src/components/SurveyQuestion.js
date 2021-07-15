import React from "react"
import SelectInput from './questiontypes/SelectInput'
import Slider from './questiontypes/Slider'
import Comment from "./questiontypes/Comment";
import RadioButtons from "./questiontypes/RadioButtons";
import Checkboxes from "./questiontypes/Checkboxes";
import Matrix from "./questiontypes/Matrix";
import MatrixNum from "./questiontypes/MatrixNum";
import PostalCode from "./questiontypes/PostalCode"
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
                {questionType === 'postal' && <PostalCode question={question} questionNumber={questionNumber}/>}
                {questionType === 'comment' && <Comment question={question} questionNumber={questionNumber} />}      
        </div>
    );
}
 
export default SurveyQuestion;



