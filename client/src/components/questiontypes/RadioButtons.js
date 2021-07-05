import React, { useState } from 'react';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';

 function RadioButtons({questionNumber}) {
  const [value, setValue] = useState('');
  // const [options, setOptions] = useState([
  //   {value: "option1", label: "Option 1"},
  //   {value: "option2", label: "Option 2"},
  //   {value: "option3", label: "Option 3"},
  //   {value: "option4", label: "Option 4"},
  //   {value: "option5", label: "Option 5"},
  //   {value: "option6", label: "Option 6"},
  //   {value: "option7", label: "Option 7"},
  //   {value: "option8", label: "Option 8"} 
  // ])

  let options = [
    'Option1',
    'Option2',
    'Option3',
    'Option4',
    'Option5',
    'Option6',
    'Option7',
    'Option8'
  ]

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    console.log("value", value);
  }

  const question = "What is your department or team?"

  return (
    <div className="radio question-component">   
        <p className="question-intro">Q{questionNumber}) {question}</p>
          {options.map((option,index) => {
           return(<div key={index}> 
              <input type="radio"
                  id={option}
                  onChange={handleChange}
                  name="option-group"
                  value={option}
                  color='primary'/>
                  <label htmlFor={option}>
              {option}
              </label>
                  </div>)
             })}
          <div>
            <button onClick={handleSubmit} type="submit">Submit</button>
          </div>
    </div>
  );
}
export default RadioButtons;