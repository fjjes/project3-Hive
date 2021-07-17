import React, { useState, useContext, useEffect } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';

 function RadioButtons({questionNumber, question, texts}) {
  const {answers, setAnswers} = useContext(AnswerContext)
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);

    let updateAnswers = {...answers}
    updateAnswers[questionNumber]=e.target.value
    setAnswers(updateAnswers)
  };

  useEffect(()=>{
    if(answers.length < questionNumber){
        let updateAnswers = {...answers}  
       updateAnswers[questionNumber]=value
        setAnswers(updateAnswers)
    }     
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="radio question-component">   
        <p className="question-intro">Q{questionNumber}.</p><span>
        <p className="question-intro">{question}</p></span>
        {texts.map((option,index) => {
          return(<div key={index}> 
            <input type="radio"
              id={option}
              onChange={handleChange}
              name="option-group"
              value={option}
              checked={answers[questionNumber] ? answers[questionNumber]=== option: false} //
              color='primary'/>
              <label htmlFor={option}>
            {option}
            </label>
              </div>)
            })}
    </div>
  );
}
export default RadioButtons;

