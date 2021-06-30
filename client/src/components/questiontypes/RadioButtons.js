import React, { useState } from 'react';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';

 function RadioButtons({questionNumber}) {
  const [value, setValue] = React.useState('');
  const [options, setOptions] = useState([
    {value: "option1", label: "Option 1"},
    {value: "option2", label: "Option 2"},
    {value: "option3", label: "Option 3"},
    {value: "option4", label: "Option 4"},
    {value: "option5", label: "Option 5"},
    {value: "option6", label: "Option 6"},
    {value: "option7", label: "Option 7"},
    {value: "option8", label: "Option 8"}
    
  ])

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    console.log("value", value);
  }

  const question = "What is your department or team?"

  return (
    <div className="question-component">
      <form >    
        <p className="question-intro">Q{questionNumber} {question}</p>
        <div className ="RadioGroup" 
        aria-label="radio" 
        name="radio1" 
        value={value} 
        onChange={handleChange}
        >        
          {options.map((option,index) => (
           <div key={index}> 
           <label htmlFor ="radio"
              key={option.value}>
              {option.label}
              </label>
              <input type="radio"
                  id="radio"
                  onChange={handleChange}
                  name="option"
                  value={option.value}
                  color='primary'/>
                  </div>
              ))}
          <div>
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
        </div>
        </form>
    </div>
  );
}
export default RadioButtons;