import React, { useState, useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";

function Checkboxes({ questionNumber, question, texts }) {
  const { answerArray, setAnswerArray } = useContext(AnswerContext);
  const [options, setOptions] = useState(
    texts.map((option) => ({ value: option, checked: false }))
  );
  // console.log("typeof texts: ", typeof texts)
  // console.log("texts: ", texts)

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
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
      if (!options[options.length - 1].checked) {
        setComment("");
      }
    }
    setOptions(newOptions);
    if (numberCount > 2) {
      setDisabled(true);
      setError("Only select 3!"); // Store and pull the max number in from DB??
    } else {
      setDisabled(false);
      setError("");
    }
    // console.log("Array of selected checkboxes: ", checkedArray);
    let updateAnswerArray = {...answerArray}
    updateAnswerArray[questionNumber]=newOptions
    setAnswerArray(updateAnswerArray)
  };

  // *** Set value of other:


  const handleOther = (e) => {
    setOther({value: e.target.value});
  };
  console.log("*** other: ", other);


  useEffect(()=>{
    if(answerArray.length < questionNumber){
        let updateAnswerArray = {...answerArray}  
       updateAnswerArray[questionNumber]=options
        setAnswerArray(updateAnswerArray)
    }     
  },[])

  // useEffect(()=>{
  //   let updateAnswerArray = [...answerArray]
  //   updateAnswerArray.push(options)
  //   setAnswerArray(updateAnswerArray)
  // },[questionNumber])

  const handleSubmit = () => {
    console.log("old options: ", options, other); // push "other" into "options" array
    options.push(other)
    console.log("updated options: ", options); // push "other" into "options" array

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
                      {...(answerArray[questionNumber]? answerArray[questionNumber][index].checked ===option.value: false)}
                    />
                    <label
                      htmlFor={option.value}
                      key={option.value}
                      style={
                        !option.checked && disabled ? { color: "grey" } : null
                      }
                      // onChange={handleChange}
                    >
                      {/* {option.value} */}
                      {options[options.length - 1].checked &&
                      index === options.length - 1 ? (
                        // *** Save value of comment input field to option value:
                        <input
                          value={other.value}
                          onChange={handleOther}
                          placeholder="Enter comment"
                        />
                      ) : (
                        option.value
                      )}
                      {console.log("option.value: ", option.value)}
                    </label>
                  </div>
                );
              })
            }
          {/* <input
            type="text"
            disabled={!options[options.length - 1].checked}
            label={`Add details for option ${options.length}.`}
            id="outlined-basic"
            name="option"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            {...answerArray.length >=questionNumber ? comment===answerArray[questionNumber-1]: comment===""}
            /> */}
        </div>
        <div style={{ color: "red" }}>{error}</div>
      </form>
      <div className="button-submit">
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Checkboxes;
