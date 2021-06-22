import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const PrettoSlider = withStyles({
  root: {
    color: "#ff7f50",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "10",
  },
];

function SliderQuestion() {
  const [slider, setSlider] = useState();

  const handleChange = (e) => {
    setSlider(e.target.value);
  };

  const handleSubmit = () => {
    console.log("slider", slider);
    setSlider(); //inout clears out when clicked on submit
  };

  return (
    <div>
      <p>Rate your experience from 1-10:</p>
      <PrettoSlider
        style={{ width: 500, marginTop: 23 }}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={0}
        step={1}
        marks
        min={0}
        max={10}
        marks={marks}
        onChange={handleChange}
        value={slider} //undefined
        // type="reset"
        // placeholder="slide"
      />
      <div>
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}

export default SliderQuestion;
