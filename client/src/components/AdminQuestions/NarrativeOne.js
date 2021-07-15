import React from "react";

function NarrativeOne(props) {

  function handleNarrativeChange(event) {
    props.onChange(event.target.value)
  }

  return (
    <div className="question-component admin-question-component narrative-component">
      <input type="text" placeholder="Insert narrative text here..." value={props.value} onChange={handleNarrativeChange}/>
    </div>
  );
}

export default NarrativeOne;
