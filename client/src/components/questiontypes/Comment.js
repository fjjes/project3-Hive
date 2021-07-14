import React, { useContext } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';

const Comment =({questionNumber, question})=> {
  const {answers, setAnswers} = useContext(AnswerContext)
  // const [comment, setComment] = useState('');

  const handleChange = (e)=>{
      // setComment((e.target.value))
    let updateAnswers = {...answers}
    updateAnswers[questionNumber]=e.target.value
    setAnswers(updateAnswers)
  }


  return (
    <div className="question-component">
      <p className="question-intro">Q{questionNumber}.</p><span>
      <p className="question-intro">{question}</p></span>
      <textarea
        rows="4"
        cols="50"
        label="comment"
        value={answers[questionNumber]}
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
