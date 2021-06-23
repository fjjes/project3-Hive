import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

 function RadioButtons() {
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    console.log("value", value);
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
          Question 1.What is your department or Team? 
      </FormLabel>

      <RadioGroup 
      aria-label="radio" 
      name="radio1" 
      value={value} 
      onChange={handleChange}
      >
        <FormControlLabel 
        value="Tech" 
        control={<Radio/>} 
        label="Technology" 
        />
        <FormControlLabel 
        value="option2" 
        control={<Radio/>} 
        label="option2" 
        />
        <FormControlLabel 
        value="option3" 
        control={<Radio/>} 
        label="option3" 
        />
        <FormControlLabel 
        value="option4" 
        control={<Radio/>} 
        label="option4" 
        />
        <FormControlLabel 
        value="option5" 
        control={<Radio/>} 
        label="option5" 
        />
        <FormControlLabel 
        value="option6" 
        control={<Radio/>} 
        label="option6" 
        />
        <FormControlLabel 
        value="option7" 
        control={<Radio/>} 
        label="option7" 
        />
        <FormControlLabel 
        value="option8" 
        control={<Radio/>} 
        label="option8" 
        />
        <FormControlLabel 
        value="other" 
        control={<Radio/>} 
        label="Other" 
        />
        <FormHelperText>Please select one</FormHelperText>
        <button onClick={handleSubmit} type="submit" variant="outlined">
          Submit
        </button>
    </RadioGroup>
        
    </FormControl>
  );
}
export default RadioButtons;