import React, {useEffect,useState, useContext } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';

const PostalCode =({questionNumber, question})=> {
  const {answers, setAnswers} = useContext(AnswerContext)
  const [postalcode, setPostalCode] = useState('');
  const [error, setError] =useState('');

  const handleChange = (e)=>{
      setPostalCode((e.target.value))
      let updateAnswers = {...answers}
            updateAnswers[questionNumber]=e.target.value
            setAnswers(updateAnswers) 
        if (/^[abceghjklmnprstvxy][0-9][abceghjklmnprstvwxyz]\s?[0-9][abceghjklmnprstvwxyz][0-9]$/i.test(e.target.value) || /^[0-9]{5}(?:-[0-9]{4})?$/.test(e.target.value) ) { 
            setError("")
        }
        else
        {
            setError('Postal Code is Invalid')
        }   
  }
  useEffect(()=>{
    if(answers.length < questionNumber){
        let updateAnswers = {...answers}
       updateAnswers[questionNumber]=postalcode
        setAnswers(updateAnswers)
    }     
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


//    /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/ - CA postal code - case sensitive
// /^[abceghjklmnprstvxy][0-9][abceghjklmnprstvwxyz]\s?[0-9][abceghjklmnprstvwxyz][0-9]$/i - CA postal code adding i at the end makes it insensitive
//   /^[0-9]{5}(?:-[0-9]{4})?$/ USA postal code 
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
        // rows="4"
        // cols="50"
        label="postalcode"
        // value={postalcode}
        value={answers[questionNumber]}
        onChange={handleChange}
        option="Postal Code"
        
      />
      <p>{error}</p>
    </div>
  );
}

export default PostalCode;
