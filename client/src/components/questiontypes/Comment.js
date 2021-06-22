import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

function Comment() {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log(comment);
    setComment(""); //inout clears out when clicked on submit
  };

  return (
    <div>
      <p>If you wish to add additional comments, you can enter them below:</p>
      <TextField
        id="outlined-basic"
        label="comment"
        variant="outlined"
        multiline
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Input"
        type="reset"
      />
      <div>
        <button onClick={handleSubmit} type="submit">
          submit
        </button>
      </div>
    </div>
  );
}

export default Comment;
