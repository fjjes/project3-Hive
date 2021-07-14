import React, { useEffect,useState, useContext } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';
import '../Form.css'

const Matrix = (props) => {
  const {answerArray, setAnswerArray} = useContext(AnswerContext)
  const [values, setValues]=useState(props.texts)

  let columns=[
    "Very Satisfied",
    "Satisfied",
    "Neither satisfied nor dissatisfied",
    "Dissatisfied",
    "Very dissatisfied"
    ]

  const handleChange = (e, i) => {
    let newValues = [...values];
    newValues[i].value = e.target.value;
    setValues(newValues);
  
    let updateAnswerArray = {...answerArray}
    updateAnswerArray[props.questionNumber]=newValues
    setAnswerArray(updateAnswerArray)
  };

  useEffect(()=>{
      if(answerArray.length < props.questionNumber){
          let updateAnswerArray = {...answerArray}
         updateAnswerArray[props.questionNumber]=values
          setAnswerArray(updateAnswerArray)
      }     
  },[])
  
  // const handleSubmit = () => {
  //   console.log(values);
  // };

  return (
    <div className="matrix question-component">
      <p className="question-intro">Q{props.questionNumber}.</p><span>
      <p className="question-intro">{props.question}</p></span>
      <table>
        <tbody>
          <tr>
            <th></th>
            {columns.map((cl, i)=> { 
              return(
                <th key={i}>
                  <label>{cl}</label>
                </th>
              )
            })}
          </tr>
          {values.map((row, i)=> {
            return(
              <tr key={i}>
                <td  className='label-rows'>
                  <label>{row.text}</label>
                </td>
                {columns.map((col, index)=>{
                    return(
                      <td key={index}>
                        <input 
                        type='radio' 
                        name={row.text} 
                        value={col} 
                        onChange={(e) => handleChange(e, i)}
                        checked={answerArray[props.questionNumber] ? answerArray[props.questionNumber][i].value=== col : false} 
                        />
                      </td>
                    )
                })}
              </tr>
            )
          })
        }
        </tbody>
      </table>
        
      {/* <div className="button-submit">
        <button onClick={handleSubmit} type="submit">Submit</button>
      </div> */}
    </div>
  );
};

export default Matrix;
