import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
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
  formControl: {
    margin: theme.spacing(3),
  },
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

  const [disabled, setDisabled] = useState(false);

  const [error, setError] = useState(false);
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
        console.log("numberCount: ", numberCount);
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
  };

  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log("Option 8 comment: ", comment);
  };

  return (
    <div className={classes.root}>
      <FormControl
        error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend" classes={{ root: classes.formLabel }}>
          Pick up to three:
        </FormLabel>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
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
            id="outlined-basic"
            variant="outlined"
            placeholder="Description"
            name="option8"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormGroup>
        <FormHelperText>Please only select a maximum of three options.</FormHelperText>
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
