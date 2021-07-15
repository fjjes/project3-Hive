import React, { useState, useContext, useEffect } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';
import { makeStyles } from "@material-ui/core/styles";
import NewSlider from "./newslider";
import "../Form.css";

const useStyles = makeStyles({
  input: {
    width: 32,
  },
});

export default function InputSlider({ questionNumber, question, texts }) {
  console.log(texts);
  const classes = useStyles();
  const {answers, setAnswers} = useContext(AnswerContext)
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

  useEffect(()=>{
    if(answers.length < questionNumber){
        let updateAnswers = {...answers}  
       updateAnswers[questionNumber]=values
        setAnswers(updateAnswers)
    }     
  },[])

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
          key={index}
          getValue={values[index]}
          setValue={setValue(index)}
          title={text}
          classes={classes}
          answers={answers}
          setAnswers={setAnswers}
          questionNumber={questionNumber}
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
