import React, { useState, useContext, useEffect } from "react";
import { AnswerContext } from "../pages/SurveyQuestionPage";
import { makeStyles } from "@material-ui/core/styles";
import NewSlider from "./newslider";
import "../Form.css";
import { truncate } from "fs";

const useStyles = makeStyles({
  input: {
    width: 32,
  },
});

export default function InputSlider({ questionNumber, question, texts }) {
  console.log(texts);
  const classes = useStyles();
  const { answers, setAnswers, setDisabled } = useContext(AnswerContext);
  const [totalCount, setTotalCount] = useState(0);
  const [values, setValues] = useState([]);
  useEffect(() => {
    if (totalCount === 100) {
      setDisabled(false);
      console.log("setDisabled");
    } else {
      setDisabled(true);
    }
  }, [totalCount]);

  useEffect(() => {
    if (values.length === 0) {
      if (answers[questionNumber]) {
        setValues(answers[questionNumber]);
      }
      // else {
      //   setValues(Array(texts.length).fill(0));
      // }
    } else {
      setAnswers((answers) => {
        let updateAnswers = { ...answers };
        updateAnswers[questionNumber] = values;
        return updateAnswers;
      });
      setTotalCount(values.reduce((a, b) => a + Number(b)));
      console.log(totalCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const setValue = (index) => {
    return (newValue) =>
      setValues((values) => {
        values[index] = newValue;
        return [...values];
      });
  };

  return (
    <div className="question-component">
      <p className="question-intro">Q{questionNumber}.</p>
      <span>
        <p className="question-intro">{question}</p>
      </span>

      {texts.map((text, index) => (
        <NewSlider
          key={index}
          getValue={values[index]}
          setValue={setValue(index)}
          title={text}
          classes={classes}
        />
      ))}
      <NewSlider />
      {totalCount === 100 && <p className="submit-message">Success!</p>}
      {totalCount !== 100 && (
        <p className="submit-message">Total Needs to be 100!</p>
      )}
    </div>
  );
}
