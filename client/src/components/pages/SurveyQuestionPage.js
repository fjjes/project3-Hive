import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SurveyQuestion from "../SurveyQuestion";
import Progress from '../Progress'

export const AnswerContext = React.createContext({
  answerArray: [],
  setAnswerArray: ()=> {}
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

const SurveyQuestionPage = () => {
  const classes = useStyles();

  // const [surveyNumber, setSurveyNumber]=useState()
  // const [version, setVersion]=useState()
  const [survey, setSurvey]=useState()
  const [answerArray, setAnswerArray]=useState({})
  const value = {answerArray, setAnswerArray}

  const [index, setIndex] = useState(0);
  const [questionArray, setQuestionArray] = useState([]);
  const [progressBarDone, setProgressBarDone]=useState(0);
  const [endSurvey, setEndSurvey]=useState(false)
  

  useEffect(()=>{
    const getSurveyQuestions = async () =>{   
      let response = await fetch('/api/survey')  //should be get by id   
      let data = await response.json();
      console.log('retrieved data:', data)
      setSurvey(data[0])
      setQuestionArray(data[0].questions)
      console.log('Survey questions:', data[0].questions)
      // setSurveyNumber(data[0].surveyNumber)
      // setVersion(data[0].version)
    }
  getSurveyQuestions()
  },[])

  const goToNextQuestion = () => {
    let counter = index + 1;
    setIndex(counter);

    let fullProgress = Math.round(((counter / (questionArray.length-1)) * 100)) //if answer selected only!!!!
    setProgressBarDone(fullProgress)
  };

  const goBackAQuestion = ()=> {
    let counter=index -1
    setIndex(counter)
  }

  // const handleSubmit = () => {
  //   console.log("answerArray at submit:",answerArray);
  // };

  const onCreateSurveyAnswersClicked= async ()=>{
let currentDate = new Date()
    let answerToCreate ={
      survey,
      answerArray,
      answeredDate: currentDate
    }
   
      let createResponse = await fetch('api/answer',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(answerToCreate)
      })
      console.log('creating an answerRecord', answerToCreate)

      if(createResponse.status === 200){
        console.log('create response is successful')
       
      }
      setEndSurvey(true)
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
                {/* <button onClick={handleSubmit} type="submit">Submit</button> */}
                <button className='col2' onClick={onCreateSurveyAnswersClicked}>Submit</button>
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
