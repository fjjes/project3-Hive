import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SurveyQuestion from "../SurveyQuestion";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    paddingRight: 16,
    paddingLeft: 16,
  },
}));

const SurveyQuestionPage = () => {
  const classes = useStyles();
  const [questionNumber, setQuestionNumber] = useState(1);
  const [values, setValues] = useState(); //!!!!!!!!!!!!!!!!!!!!!!!

  const goToNextQuestion = () => {
    let counter = questionNumber + 1;
    setQuestionNumber(counter);
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <SurveyQuestion questionNumber={questionNumber} />
        {questionNumber === 7 ? (
          <div>
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
        ) : (
          <div>
            <button onClick={goToNextQuestion}>Next</button>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default SurveyQuestionPage;
