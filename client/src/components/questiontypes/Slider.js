import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../Form.css";
import NewSlider from "./newslider";

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 300,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider({ questionNumber, question, texts }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  const [value3, setValue3] = React.useState(0);
  const [value4, setValue4] = React.useState(0);
  const [value5, setValue5] = React.useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const values = [value, value2, value3, value4, value5];
  const setValues = [setValue, setValue2, setValue3, setValue4, setValue5];

  useEffect(() => {
    setTotalCount(value + value2 + value3 + value4 + value5);
  }, [value, value2, value3, value4, value5]);

  const handleSubmit = () => {
    setValue(0);
    setValue2(0);
    setValue3(0);
    setValue4(0);
    setValue5(0);
    console.log(value, value2, value3, value4, value5);
  };

  // let question =
  //   "Normally, during a regular workweek, what percentage of your time do you work in the following locations? The total of the answers must equal to the sum of 100%.";

  // let texts = ["1", "2", "3", "4", "5"];

  return (
    <div className="slider">
      {/* <div className={classes.root}> */}
      <p className="question-intro">Q{questionNumber}.</p>
      <span>
        <p className="question-intro">{question}</p>
      </span>

      {texts.map((text, index) => (
        <NewSlider
          getValue={values[index]}
          setValue={setValues[index]}
          title={text}
          classes={classes}
        />
      ))}
      <NewSlider />
      <div className="button-submit">
        <button
          onClick={handleSubmit}
          disabled={totalCount === 100 ? false : true}
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
