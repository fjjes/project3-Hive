import React, { useState, useContext, useEffect } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';

 function RadioButtons({questionNumber, question, texts}) {
  const {answerArray, setAnswerArray} = useContext(AnswerContext)
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);

    let updateAnswerArray = [...answerArray]
    updateAnswerArray.push(e.target.value)
    setAnswerArray(updateAnswerArray)
  };

  // useEffect(()=>{
  //   let updateAnswerArray = [...answerArray]
  //   updateAnswerArray.push(value)
  //   setAnswerArray(updateAnswerArray)
  // },[questionNumber])

  const handleSubmit = () => {
    console.log("value", value);
  }

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
              color='primary'/>
              <label htmlFor={option}>
            {option}
            </label>
              </div>)
            })}
          <div>
            <button onClick={handleSubmit} type="submit">Submit</button>
          </div>
    </div>
  );
}
export default RadioButtons;