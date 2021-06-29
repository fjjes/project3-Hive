import React, {useState} from "react";
import SurveyQuestion from "../SurveyQuestion";

const SurveyQuestionPage = () => {
    const [questionNumber, setQuestionNumber]= useState(1)
    const [values, setValues]=useState()

    const goToNextQuestion =()=>{
        let counter = questionNumber + 1
        setQuestionNumber(counter)
    }

    const handleSubmit = () => {
        console.log(values)
    }

    return (
        <div className="survey-question-page">
            <SurveyQuestion questionNumber={questionNumber} />
            {
                questionNumber === 7 ? 
                (
                    <div>
                        <button onClick={handleSubmit} type="submit" >Submit</button>
                    </div>
                ):(
                    <div>
                        <button onClick={goToNextQuestion}>Next</button>
                    </div>
                )
            } 
        </div>
    );
}
 
export default SurveyQuestionPage;