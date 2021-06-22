import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

 function Checkboxes() {
  const classes = useStyles();
  const [state, setState] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
    option7: false,
    option8: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(event.target.name, event.target.checked)
  };

  const { option1, option2, option3, option4, option5, option6, option7, option8 } = state;
  const error = [option1, option2, option3, option4, option5, option6, option7, option8].filter((v) => v).length !== 3;

  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log("Option 8 comment: ", comment);
  }

  return (
    <div className={classes.root}>
      <FormControl error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick up to three:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={option1} onChange={handleChange} name="option1" />}
            label="Option 1"
          />
          <FormControlLabel
            control={<Checkbox checked={option2} onChange={handleChange} name="option2" />}
            label="Option 2"
          />
          <FormControlLabel
            control={<Checkbox checked={option3} onChange={handleChange} name="option3" />}
            label="Option 3"
          />
          <FormControlLabel
            control={<Checkbox checked={option4} onChange={handleChange} name="option4" />}
            label="Option 4"
          />
          <FormControlLabel
            control={<Checkbox checked={option5} onChange={handleChange} name="option5" />}
            label="Option 5"
          />
          <FormControlLabel
            control={<Checkbox checked={option6} onChange={handleChange} name="option6" />}
            label="Option 6"
          />
          <FormControlLabel
            control={<Checkbox checked={option7} onChange={handleChange} name="option7" />}
            label="Option 7"
          />
          <FormControlLabel
            control={<Checkbox checked={option8} onChange={handleChange} name="option8" />}
            label="Option 8"
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Description" 
            name="option8"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
        </FormGroup>
        <FormHelperText>Please only select a maximum of three.</FormHelperText>
      <div>
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div>
      </FormControl>
    </div>
  );
}

export default Checkboxes;