import React, { useState } from "react";

function Checkboxes({ questionNumber }) {
  const [options, setOptions] = useState([
    { checked: false, value: "Option 1" },
    { checked: false, value: "Option 2" },
    { checked: false, value: "Option 3" },
    { checked: false, value: "Option 4" },
    { checked: false, value: "Option 5" },
    { checked: false, value: "Option 6" },
    { checked: false, value: "Option 7" },
    { checked: false, value: "Option 8" },
  ]);

  const question = "Select up to three options:";

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");

  let checkedArray = [];

  const handleChange = (event) => {
    console.log(event.target.name, event.target.checked, event.target.value);
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
      setError(true);
    } else {
      setDisabled(false);
      setError(false);
    }
    console.log("Array of selected checkboxes: ", checkedArray);
  };

  const handleSubmit = () => {
    console.log(options, comment);
  };

  return (
    <div className="question-component">
      <form className="checkbox-form-control">
        <p className="question-intro">
          Q{questionNumber}) {question}
        </p>
        <div className="checkbox-form-group">
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                disabled={disabled && !option.checked}
                checked={option.checked}
                onChange={handleChange}
                name="option"
                id="option"
                value={option.value}
              />
              <label
                htmlFor="option"
                key={option.value}
              >
                {option.value}
              </label>
            </div>
          ))}
          <input
            type="text"
            disabled={!options[options.length - 1].checked}
            label={`Add details for option ${options.length}.`}
            id="outlined-basic"
            name="option"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkboxes;
