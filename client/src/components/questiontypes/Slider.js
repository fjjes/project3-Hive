import React, { useState, useState2 } from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 550,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Normally, during a regular workweek, what percentage of your time do you
        work in the following locations? The total of the answers must equal to
        the sum of 100%
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <p>Home</p>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
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
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <p>Work</p>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
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
// const PrettoSlider = withStyles({
//   root: {
//     color: "#ff7f50",
//     height: 8,
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: "#fff",
//     border: "2px solid currentColor",
//     marginTop: -8,
//     marginLeft: -12,
//     "&:focus, &:hover, &$active": {
//       boxShadow: "inherit",
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: "calc(-50% + 4px)",
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

// const marks = [
//   {
//     value: 0,
//     label: "0",
//   },
//   {
//     value: 10,
//     label: "10",
//   },
// ];

// function SliderQuestion() {
//   const [slider, setSlider] = useState();

//   const handleSubmit = () => {
//     console.log("slider", slider);
//     setSlider();
//   };

//   return (
//     <div>
//       <p>Rate your experience from 1-10:</p>
//       <PrettoSlider
//         style={{ width: 500, marginTop: 23 }}
//         valueLabelDisplay="auto"
//         aria-label="pretto slider"
//         defaultValue={0}
//         step={1}
//         marks
//         min={0}
//         max={10}
//         marks={marks}
//         value={slider} //undefined
//         onChange={(e) => setSlider(e.target.value)}
//         // type="reset"
//       />
//       <div>
//         <button onClick={handleSubmit} type="submit">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }
