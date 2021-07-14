import React, { useEffect,useState, useContext } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';

const Comment =({questionNumber, question})=> {
  const {answerArray, setAnswerArray} = useContext(AnswerContext)
  const [comment, setComment] = useState('');

  const handleChange = (e)=>{
      setComment((e.target.value))

      // let updateAnswerArray = [...answerArray]
      // updateAnswerArray[updateAnswerArray.length-1]=e.target.value
      // setAnswerArray(updateAnswerArray)

    let updateAnswerArray = {...answerArray}
    updateAnswerArray[questionNumber]=e.target.value
    setAnswerArray(updateAnswerArray)
  }

 

  useEffect(()=>{
    if(answerArray.length < questionNumber){
        let updateAnswerArray = {...answerArray}  
       updateAnswerArray[questionNumber]=comment
        setAnswerArray(updateAnswerArray)
    }     
  },[])

   // useEffect(()=>{
  //   let updateAnswerArray = [...answerArray]
  //   updateAnswerArray.push(comment)
  //   setAnswerArray(updateAnswerArray)
  // },[])

  // const handleSubmit=()=>{
  //   console.log(comment)
  // }

  return (
    <div className="question-component">
      <p className="question-intro">Q{questionNumber}.</p><span>
      <p className="question-intro">{question}</p></span>
      <textarea
        rows="4"
        cols="50"
        label="comment"
        value={comment}
        {...answerArray[questionNumber]? comment===answerArray[questionNumber]: comment===""}
        onChange={handleChange}
        placeholder="Input"
      />
      {/* <div className="button-submit">
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div> */}
    </div>
  );
}

export default Comment;
