import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";




function Comment({questionNumber}) {
  const [comment, setComment] = useState("");

  let question = 'If you wish to add additional comments, you can enter them below:'

  const handleSubmit=()=>{
    console.log(comment)
    setComment("") 
    //props.onChangedValues(comment)
  }

  return (
    <div className="question-component">
      <p className="question-intro">Q{questionNumber}) {question}</p>
      <TextField
        id="outlined-basic"
        label="comment"
        variant="outlined"
        multiline
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Input"
        type="reset"
      />
      <div>
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Comment;
