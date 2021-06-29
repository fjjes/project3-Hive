import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formLabel: {
    color: "#000",
    "&.Mui-focused": {
      color: "#000",
    },
  },
  // formControl: {
  //   margin: theme.spacing(3),
  // },
}));

function Checkboxes() {
  const classes = useStyles();
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

  const question = "Select up to three options:"

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");

  let checkedArray = []

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
        option.checked && checkedArray.push(option.value)
      }
      if (!options[options.length - 1].checked) {
        setComment("")
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
    console.log("Array of selected checkboxes: ", checkedArray)
  };

  const handleSubmit = () => {
    console.log(options, comment)
  };

  return (
    <div className="question-component">
    {/* <div className={classes.root}> */}
      <FormControl
        error={error}
        component="fieldset"
        className={classes.formControl}
      >
        {/* <FormLabel component="legend" classes={{ root: classes.formLabel }}>
          Pick up to three:
        </FormLabel> */}
        <p className="question-intro">{question}</p>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  disabled={disabled && !option.checked}
                  checked={option.checked}
                  onChange={handleChange}
                  name="option"
                  value={option.value}
                />
              }
              label={option.value}
              />
              ))}
              <TextField
                fullWidth
                disabled={!options[options.length - 1].checked}
                label={`Add details for option ${options.length}.`}
                id="outlined-basic"
                variant="outlined"
                name="option"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
        </FormGroup>
        {/* <FormHelperText>Please only select a maximum of three options.</FormHelperText> */}
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
