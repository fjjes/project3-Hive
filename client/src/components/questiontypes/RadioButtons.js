import React, { useState } from 'react';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';

 function RadioButtons({questionNumber, question, texts}) {
  const [value, setValue] = useState('');

  // let options = [
  //   'Option1',
  //   'Option2',
  //   'Option3',
  //   'Option4',
  //   'Option5',
  //   'Option6',
  //   'Option7',
  //   'Option8'
  // ]

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    console.log("value", value);
  }

  // const question = "What is your department or team?"

  return (
    <div className="radio question-component">   
        <p className="question-intro">Q{questionNumber}) {question}</p>
          {texts.map((option,index) => {
           return(<div key={index}> 
              <input type="radio"
                  id="radio"
                  onChange={handleChange}
                  name="option-group"
                  value={option}
                  color='primary'/>
                  <label htmlFor ="radio">
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