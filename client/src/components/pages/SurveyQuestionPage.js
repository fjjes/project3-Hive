import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SurveyQuestion from "../SurveyQuestion";
import Progress from '../Progress'

export const AnswerContext = React.createContext({
  answers: {},
  setAnswers: ()=> {}
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
  root2:{
    paddingTop: 50,
    paddingBottom: 50,
    marginTop: theme.spacing(3),
    paddingRight: 50,
    paddingLeft: 50,
  }
}));

const SurveyQuestionPage = ({survey, questionArray}) => {
  const classes = useStyles();
  const [error, setError] = useState()
  const [answers, setAnswers]=useState({})
  const value = {answers, setAnswers}

  const [index, setIndex] = useState(0);
  const [progressBarDone, setProgressBarDone]=useState(0);
  const [endSurvey, setEndSurvey]=useState(false)
  const [plus, setPlus]=useState(0)

  const goToNextQuestion = () => {
    let counter = index + 1;
    setIndex(counter);
    setPlus(counter)
  };

  const goBackAQuestion = ()=> {
    let counter=index -1
    setIndex(counter)
    
  }

  useEffect(()=>{
    //let fullProgress = Math.round(((plus / Object.keys(answers).length-1) * 100)) 
    let fullProgress = Math.round(((plus/ (questionArray.length-1)) * 100)) //should be if answer selected only!!!!
    setProgressBarDone(fullProgress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[answers])


  const onCreateSurveyAnswersClicked= async ()=>{
  let currentDate = new Date()
    let answerToCreate ={
      survey,
      answers,
      answeredDate: currentDate
    }
    try {
      let createResponse = await fetch('/api/answer',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(answerToCreate)
      })
      console.log('creating an answerRecord', answerToCreate)

      // if(answerToCreate.answers.length !== questionArray.length){
      //   setEndSurvey(false)
      //   setError('Please answer all questions')
      // }
      if(createResponse.status !== 200){
        let errorMessage = await createResponse.text()
        console.log('We have an error: ', errorMessage)
        setEndSurvey(false)
        setError(errorMessage)  
      }else{
        setError(undefined)
        console.log('create response is successful')
        setEndSurvey(true)
      }
    }catch(error){
        console.log('Fetch failed to reach the server:', error)
    }
  }

  return (
    <div className='survey-page'> 
      {endSurvey=== false?
      <div>
        <Paper className={classes.root} elevation={4}>
            <AnswerContext.Provider value={value}>
              <SurveyQuestion questionBlock={questionArray[index]}/>
            </AnswerContext.Provider>
            <div className="btns">
              {index=== 0 && <button className='col2 next-btn' onClick={goToNextQuestion}>Next</button>}
              {index === questionArray.length-1 && 
              <div className="row">
                <button className='col1 back-btn' onClick={goBackAQuestion}>Back</button>
                <button className='col2' onClick={onCreateSurveyAnswersClicked}>Submit</button>
                {error && <div>{error}</div>}
              </div>
              }
              {index!== 0 && index!== questionArray.length-1 &&
              <div className="row">
                <button className='col1 back-btn' onClick={goBackAQuestion}>Back</button>
                <button className='col2 next-btn' onClick={goToNextQuestion}>Next</button>
              </div>
              }
            </div>
            </Paper>
            <Progress done={progressBarDone}/>
          </div>
        :
        <Paper className={classes.root2} elevation={4}>
          <h2>Thank you for your participation!!</h2>
       </Paper>
      }
     
    </div>
  );
};

export default SurveyQuestionPage;
