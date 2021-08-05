import React, { useState, useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";

function Checkboxes({ questionNumber, question, texts }) {
  const { answers, setAnswers, setValidationErrorMessage } = useContext(AnswerContext);
  const [options, setOptions] = useState(
    texts.map((option) => ({ value: option, checked: false }))
  );

  const [disabled, setDisabled] = useState(false);
  const [other, setOther] = useState({ value: "" });

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
        setOther({ value: "" }); // Currently still console.logs the original "other" value (after being unchecked) when using the final Submit button or the back button - but the value should be cleared when it's unchecked
      }
    }

    setOptions(newOptions);
    if (numberCount > 2) {
      setDisabled(true);
      // No error message needed since it doesn't allow them to select more than 3.
      setValidationErrorMessage(""); 
    } else {
      setDisabled(false);
      setValidationErrorMessage("");
    }
    let updateAnswers = { ...answers };
    updateAnswers[questionNumber] = { options: newOptions, other: other };
    setAnswers(updateAnswers);
  };

  const handleOther = (e) => {
    setOther({ value: e.target.value });
    let updateAnswers = {...answers}
    updateAnswers[questionNumber].other = {value: e.target.value}
    setAnswers(updateAnswers)
  };

  useEffect(() => {
    if (answers[questionNumber]) {
      setOptions(answers[questionNumber].options);
      setOther(answers[questionNumber].other);
    }
  }, [answers, questionNumber]);

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
                  style={!option.checked && disabled ? { color: "grey" } : null}
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
          })}
        </div>
      </form>
    </div>
  );
}

export default Checkboxes;
