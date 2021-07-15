import React, { useState, useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";

function Checkboxes({ questionNumber, question, texts }) {
  const { answers, setAnswers } = useContext(AnswerContext);
  const [options, setOptions] = useState(
    texts.map((option) => ({ value: option, checked: false }))
  );

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  // const [comment, setComment] = useState("");
  const [other, setOther] = useState({value: ""});

  let checkedArray = [];

  const handleChange = (event) => {
    let numberCount = 0;
    const newOptions = [...options];
    for (let option of newOptions) {
      if (option.value === event.target.value) {
        option.checked = event.target.checked;
      }
      if (option.checked) {
        numberCount++;
        option.checked && checkedArray.push(option.value);
      }
      // if (!options[options.length - 1].checked) {
      //   setComment("");
      // }
    }
    setOptions(newOptions);
    if (numberCount > 2) {
      setDisabled(true);
      setError("Only select 3!"); // Store and pull the max number in from DB??
    } else {
      setDisabled(false);
      setError("");
    }
    let updateAnswers = {...answers}
    updateAnswers[questionNumber] = {options: newOptions, other: other}
    setAnswers(updateAnswers)
  };

  const handleOther = (e) => {
    setOther({value: e.target.value});
  };

  useEffect(()=>{
    if(answers[questionNumber]){
      setOptions(answers[questionNumber].options)
      setOther(answers[questionNumber].other)
    }     
  },[answers, questionNumber])

  const handleSubmit = () => {
    // console.log("old options: ", options, other); // push "other" into "options" array
    options.push(other) // *** DO WE STILL WANT THIS LINE?? ***
    // console.log("updated options: ", options); // push "other" into "options" array
    console.log("OPTIONS: ", options, "OTHER: ", other)

  };

  return (
    <div className="question-component">
      <form className="checkbox-form-control">
        <p className="question-intro">Q{questionNumber}.</p>
        <span>
          <p className="question-intro">{question}</p>
        </span>
        <div className="checkbox-form-group">
          {options.map((option, index) => {
          return (
                  <div key={index}>
                    <input
                      type="checkbox"
                      disabled={disabled && !option.checked}
                      checked={option.checked}
                      onChange={handleChange}
                      name="option"
                      id={option.value}
                      value={option.value}
                    />
                    <label
                      htmlFor={option.value}
                      key={option.value}
                      style={
                        !option.checked && disabled ? { color: "grey" } : null
                      }
                    >
                      {options[options.length - 1].checked &&
                      index === options.length - 1 ? (
                        <input
                          autoFocus
                          value={other.value}
                          onChange={handleOther}
                          placeholder="Enter comment"
                        />
                      ) : (
                        option.value
                      )}
                    </label>
                  </div>
                );
              })
            }
        </div>
        <div style={{ color: "red" }}>{error}</div>
      </form>
      {/* <div className="button-submit">
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div> */}
    </div>
  );
}

export default Checkboxes;
