import React from 'react';

const question = "Enter a comment:"


const CommentOne =({questionNumber})=> {
  return (
    <div className="question-component admin-question-component">
      <p className="question-intro">Q{questionNumber}.</p><span>
      <p className="question-intro">{question}</p></span>
      <textarea
        rows="4"
        cols="50"
        label="comment"
        placeholder="Input"
      />
    </div>
  );
}

export default CommentOne;
