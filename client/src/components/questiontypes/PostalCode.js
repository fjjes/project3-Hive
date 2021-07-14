import React, { useEffect,useState, useContext } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';

const PostalCode =({questionNumber, question})=> {
  const {answers, setAnswers} = useContext(AnswerContext)
//   const [postalcode, setPostalCode] = useState('');
  const [error, setError] =useState('');

  const handleChange = (e)=>{
    //   setPostalCode((e.target.value))
        if (/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/.test(e.target.value) || /^[0-9]{5}(?:-[0-9]{4})?$/.test(e.target.value) ) {

            let updateAnswers = {...answers}
            updateAnswers[questionNumber]=e.target.value
            setAnswers(updateAnswers) 
            setError("")
        }else{
            setError('Postal Code is Invalid')
        }
    
  }
//  const isZipValidUs = postalCodeus.length === 5 && postalcode;
//  const isZipValidCanada = postalCodecanada.length === 6 && postalcode;

//     function validateCityOrPostalCode(postalcode) {
//     return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(postalcode);
//   }

//   function(value) {
//     console.log(value +":"+ validateCityOrPostalCode(value));
// }
  return (
    <div className="postal code question-component">
      <p className="question-intro">Q{questionNumber}.</p><span>
      <p className="question-intro">{question}</p></span>
      <input
        rows="4"
        cols="50"
        label="postalcode"
        // value={postalcode}
        value={answers[questionNumber]}
        onChange={handleChange}
        option="Postal Code"
        // setAnswer(value.replace(^[0-9]{5}(?:-[0-9]{4})?$, "").substr(0, 5));
        // setAnswer(value.replace(^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$, "").substr(0, 6));
        
      />
      <p>{error}</p>
    </div>
  );
}

export default PostalCode;
