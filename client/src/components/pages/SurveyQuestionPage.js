import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SurveyQuestion from "../SurveyQuestion";
import Progress from '../Progress'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing(3),
    paddingRight: 16,
    paddingLeft: 16,
    width:'60vw'
  },

}));

const SurveyQuestionPage = () => {
  const classes = useStyles();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionArray, setQuestionArray] = useState([]);
  const [progressBarDone, setProgressBarDone]=useState(0);

  useEffect(()=>{
    const getSurveyQuestions = async () =>{   
      let response = await fetch('/api/survey')  //should be get by id   
      let data = await response.json();
      console.log('retrieved data:', data)
      setQuestionArray(data[0].questions)
      console.log('Survey questions:', data[0].questions)
  }
  getSurveyQuestions()
  },[])

  const goToNextQuestion = () => {
    let counter = questionNumber + 1;
    setQuestionNumber(counter);

    let fullProgress = Math.round(((counter / (7)) * 100)) //7 should be questionArray length
    setProgressBarDone(fullProgress)

    // let newArr = [...qValuesArray];
    // newArr.push(props.matrixOneValues);
    // setQValuesArray(newArr);
  };

  const goBackAQuestion = ()=> {
    let counter=questionNumber -1
    setQuestionNumber(counter)
  }

  const handleSubmit = () => {
    console.log(questionArray);
  };


  return (
    <div className='survey-page'>
      <Progress done={progressBarDone}/>
      <Paper className={classes.root} elevation={4}>
        {/* <SurveyQuestion questionNumber={questionNumber} /> */}
        <SurveyQuestion questionBlock={questionArray[questionNumber]}/>
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
