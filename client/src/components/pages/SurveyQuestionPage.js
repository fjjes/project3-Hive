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
    width:'60vw'
  },

}));

const SurveyQuestionPage = (props) => {
  const classes = useStyles();
  const [questionNumber, setQuestionNumber] = useState(1);
  const [qValuesArray, setQValuesArray] = useState([]);

  const goToNextQuestion = () => {
    let counter = questionNumber + 1;
    setQuestionNumber(counter);

    let newArr = [...qValuesArray];
    newArr.push(props.matrixOneValues);
    setQValuesArray(newArr);
  };

  const goBackAQuestion = ()=> {
    let counter=questionNumber -1
    setQuestionNumber(counter)
  }

  const handleSubmit = () => {
    console.log(qValuesArray);
  };

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <SurveyQuestion questionNumber={questionNumber} />
        {questionNumber === 7 ? (
          <div>
            <button onClick={goBackAQuestion}>Back</button>
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
        ) : ( questionNumber === 1? (
            <div><button onClick={goToNextQuestion}>Next</button></div>
        ):(
          <div>
            <button onClick={goBackAQuestion}>Back</button>
            <button onClick={goToNextQuestion}>Next</button>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default SurveyQuestionPage;
