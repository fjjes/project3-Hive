import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SurveyQuestion from "../SurveyQuestion";
import Progress from '../Progress'

export const AnswerContext = React.createContext({
  answerArray: [],
  serAnswerArray: ()=> {}
})

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

  const [department, setDepartment]=useState() //passed down from a survey question's answer???
  const [surveyNumber, setSurveyNumber]=useState()
  const [version, setVersion]=useState()
  const [answerArray, setAnswerArray]=useState([])
  const value = {answerArray, setAnswerArray}

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
      setSurveyNumber(data[0].surveyNumber)
      setVersion(data[0].version)
    }
  getSurveyQuestions()
  },[])

  const goToNextQuestion = () => {
    let counter = questionNumber + 1;
    setQuestionNumber(counter);

    let fullProgress = Math.round(((counter / (questionArray.length)) * 100)) //7 should be questionArray length
    setProgressBarDone(fullProgress)
  };

  const goBackAQuestion = ()=> {
    let counter=questionNumber -1
    setQuestionNumber(counter)
  }

  // const handleSubmit = () => {
  //   console.log("answerArray at submit:",answerArray);
  // };

  const onCreateSurveyAnswersClicked= async ()=>{

    let answerArrayToCreate ={
      department,
      surveyNumber,
      version,
      answerArray
    }
   
      let createResponse = await fetch('api/answer',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(answerArrayToCreate)
      })
      console.log('creating an answerRecord', answerArrayToCreate)

      if(createResponse.status === 200){
        console.log('create response is successful')
      }
  }

  return (
    <div className='survey-page'>
      
      <Paper className={classes.root} elevation={4}>
        
        <AnswerContext.Provider value={value}>
          <SurveyQuestion questionBlock={questionArray[questionNumber]}/>
        </AnswerContext.Provider>
        
        {questionNumber=== 1 && <button onClick={goToNextQuestion}>Next</button>}
        {questionNumber === questionArray.length && 
         <div>
          <button onClick={goBackAQuestion}>Back</button>
          {/* <button onClick={handleSubmit} type="submit">Submit</button> */}
          <button onClick={onCreateSurveyAnswersClicked}>Submit</button>
        </div>
        }
        {questionNumber!== 1 && questionNumber!== questionArray.length &&
        <div>
          <button onClick={goBackAQuestion}>Back</button>
          <button onClick={goToNextQuestion}>Next</button>
        </div>
        }

      </Paper>
      <Progress done={progressBarDone}/>
    </div>
  );
};

export default SurveyQuestionPage;
