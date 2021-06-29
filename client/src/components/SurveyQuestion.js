import React,{ useEffect, useState }  from "react"
import SelectInput from './questiontypes/SelectInput'
import Slider from './questiontypes/Slider'
import Comment from "./questiontypes/Comment";
import RadioButtons from "./questiontypes/RadioButtons";
import Checkboxes from "./questiontypes/Checkboxes";
import MatrixOne from './MatrixOne'
import MatrixTwo from './MatrixTwo'

const SurveyQuestion = ({questionNumber}) => {
    const [currentQuestion, setCurrentQuestion]= useState()

    useEffect(()=>{
        const pickQuestion =()=>{
            if(questionNumber===1){
                setCurrentQuestion(<SelectInput questionNumber={1}/>)
            }else if(questionNumber === 2){
                setCurrentQuestion(<Slider questionNumber={2}/>)
            }else if(questionNumber === 3){
                setCurrentQuestion(<RadioButtons questionNumber={3}/>)
            }else if(questionNumber === 4){
                setCurrentQuestion(<Checkboxes questionNumber={4}/>)
            }else if(questionNumber === 5){
                setCurrentQuestion(<MatrixOne questionNumber={5}/>)
            }else if(questionNumber === 6){
                setCurrentQuestion(<MatrixTwo questionNumber={6}/>)
            }else if(questionNumber === 7){
                setCurrentQuestion(<Comment questionNumber={7}/>)
            }
        }
        pickQuestion()
    },[questionNumber])
    
        
    return (
        <div className="survey-question">
            {currentQuestion}
        </div>
    );
}
 
export default SurveyQuestion;