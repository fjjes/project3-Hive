// THIS COMPONENT ISN'T BEING USED YET - WHOEVER ASSIGNS THE PARAGRAPH COMPONENT CARD CAN EITHER USE THIS BASE, OR DELETE IT

import React from "react";

function ParagraphOne(props) {

  function handleParagraphChange(event) {
    props.onChange(event.target.value)
  }

  return (
    <div className="question-component admin-question-component paragraph-component">
      <textarea rows="5" cols="100" type="text" placeholder="Insert paragraph text here..." value={props.value} onChange={handleParagraphChange}/>
    </div>
  );
}

export default ParagraphOne;
