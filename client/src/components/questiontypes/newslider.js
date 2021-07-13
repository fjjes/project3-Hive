import React from "react";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";

export default function NewSlider({ getValue, setValue, title, classes }) {
  if (classes == null) {
    return null;
  }

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (getValue < 0) {
      setValue(0);
    } else if (getValue > 100) {
      setValue(100);
    }
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100",
    },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        <div className="side-text">
          <p>{title}</p>
        </div>
        <Grid item xs>
          <Slider
            value={typeof getValue === "number" ? getValue : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            marks={marks}
            step={5}
            marks
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={getValue}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
