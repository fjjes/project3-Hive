import React,{ useEffect, useState }  from "react"
import SelectInput from './questiontypes/SelectInput'
import Slider from './questiontypes/Slider'
import Comment from "./questiontypes/Comment";
import RadioButtons from "./questiontypes/RadioButtons";
import Checkboxes from "./questiontypes/Checkboxes";
import MatrixOne from './MatrixOne'
import MatrixTwo from './MatrixTwo'
import './Form.css'

const SurveyQuestion = ({questionNumber}) => {
    const [currentQuestion, setCurrentQuestion]= useState()
    const [matrixOneValues, setMatrixOneValues]=useState([])
    const [matrixTwoValues, setMatrixTwoValues]=useState([])
    //const [questionArray, setQuestionArray]=useState([])

    useEffect(()=>{
        const pickQuestion =()=>{
            if(questionNumber===1){
                setCurrentQuestion(<SelectInput 
                                    questionNumber={1}
                                    />)
            }else if(questionNumber === 2){
                setCurrentQuestion(<Slider 
                                    questionNumber={2}
                                    />)
            }else if(questionNumber === 3){
                setCurrentQuestion(<RadioButtons 
                                    questionNumber={3}
                                    />)
            }else if(questionNumber === 4){
                setCurrentQuestion(<Checkboxes 
                                    questionNumber={4}
                                    />)
            }else if(questionNumber === 5){
                setCurrentQuestion(<MatrixOne 
                                    questionNumber={5}
                                    onChangedValues={(values)=>setMatrixOneValues(values)}
                                    matrixOneValues={matrixOneValues}
                                    />)
            }else if(questionNumber === 6){
                setCurrentQuestion(<MatrixTwo 
                                    questionNumber={6}
                                    onChangedValues={(values)=>setMatrixTwoValues(values)}
                                    matrixTwoValues={matrixTwoValues}
                                    />)
            }else if(questionNumber === 7){
                setCurrentQuestion(<Comment 
                                    questionNumber={7}
                                    />)
            }
        }
        pickQuestion()
    },[questionNumber, matrixOneValues, matrixTwoValues])
    

        


    return (
        <div className="survey-question">
            {currentQuestion}
        </div>
    );
}
 
export default SurveyQuestion;