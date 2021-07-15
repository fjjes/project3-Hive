import React from "react";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

export default function NewSlider({ getValue, setValue, title, classes, answers, setAnswers, questionNumber }) {
  if (classes == null) {
    return null;
  }

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);


    let updateAnswers = {...answers}
    updateAnswers[questionNumber]=newValue
    setAnswers(updateAnswers)
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));

    let updateAnswers = {...answers}
    updateAnswers[questionNumber]=Number(event.target.value)
    setAnswers(updateAnswers)
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
      <tr>
        <td className="side-text">
          <p>{title}</p>
        </td>
        <td className="slider">
          <Slider
            value={typeof getValue === "number" ? getValue : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            marks={marks}
            step={5}
            marks
          />
        </td>
        <td className="input">
          <Input
            className={classes.input}
            value={getValue}
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
        </td>
      </tr>
    </div>
  );
}
