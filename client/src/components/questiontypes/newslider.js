import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function NewSlider({ getValue, setValue, title, classes }) {
  if (classes == null) {
    return null;
  }

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(
      event.target.value === ""
        ? ""
        : Math.max(Math.min(Number(event.target.value), 100), 0)
    );
  };

  const handleBlur = () => {
    if (getValue < 0) {
      setValue(0);
    } else if (getValue > 100) {
      setValue(100);
    }
  };

  const marks = {
    0: 0,
    100: 100,
  };

  return (
    <div className="slider">
      <p>{title}</p>
      <Slider
        value={typeof getValue === "number" ? getValue : 0}
        onChange={handleSliderChange}
        ariaLabelledbyForHandle="input-slider"
        marks={marks}
        step={5}
        handleStyle={{ backgroundColor: "#f59645", border: "none" }}
        trackStyle={{ backgroundColor: "#f59645" }}
        min={0}
        max={100}
      />
      <input
        className="input"
        type="number"
        // className={classes.input}
        value={getValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        step={5}
        min={0}
        max={100}
        aria-labelledby="input-slider"
      />
    </div>
  );
}
