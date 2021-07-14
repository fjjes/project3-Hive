import React, { useContext } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';

const Comment =({questionNumber, question})=> {
  const {answerArray, setAnswerArray} = useContext(AnswerContext)
  // const [comment, setComment] = useState('');

  const handleChange = (e)=>{
      // setComment((e.target.value))
    let updateAnswerArray = {...answerArray}
    updateAnswerArray[questionNumber]=e.target.value
    setAnswerArray(updateAnswerArray)
  }


  return (
    <div className="question-component">
      <p className="question-intro">Q{questionNumber}.</p><span>
      <p className="question-intro">{question}</p></span>
      <textarea
        rows="4"
        cols="50"
        label="comment"
        value={answerArray[questionNumber]}
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
