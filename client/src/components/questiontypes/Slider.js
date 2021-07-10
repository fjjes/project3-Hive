import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../Form.css";
import NewSlider from "./NewSlider";

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
  console.log(texts);
  const classes = useStyles();
  const [totalCount, setTotalCount] = useState(0);
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (values.length === 0) {
      return;
    }
    setTotalCount(values.reduce((a, b) => a + b));
  }, [values]);

  useEffect(() => {
    setValues(Array(texts.length).fill(0));
  }, [texts]);

  const setValue = (index) => {
    return (newValue) =>
      setValues((values) => {
        values[index] = newValue;
        return [...values];
      });
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <div className="slider">
      <p className="question-number">Q{questionNumber}.</p>
      <span>
        <p className="question-intro">{question}</p>
      </span>

      {texts.map((text, index) => (
        <NewSlider
          getValue={values[index]}
          setValue={setValue(index)}
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
