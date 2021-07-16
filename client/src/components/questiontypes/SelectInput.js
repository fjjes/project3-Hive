import React, { useState, useContext, useEffect } from 'react';
import { AnswerContext } from '../pages/SurveyQuestionPage';
import '../Form.css'

const SelectInput = (props) => {
    const {answers, setAnswers} = useContext(AnswerContext)
    const [values, setValues]=useState(props.texts)
    //const [selectArray, setSelectArray]=useState([])
   
    let selectArray = [];
    //let selectArr=[]
    let num= 1
    for(let i=0; i<values.length; i++){
        selectArray.push(num++) 
        // selectArr.push(num++) 
        // setSelectArray(selectArr)       
    }
   
    const handleChange = (e,i)=>{
        let newValues = [...values]
        newValues[i].value= e.target.value
        setValues(newValues)

        // let arr = [...selectArray]
        // const index = arr.indexOf(e.target.value)
        // arr.splice(index, 1)
        // setSelectArray(arr)

        let updateAnswers = {...answers}
        updateAnswers[props.questionNumber]=newValues
        setAnswers(updateAnswers)
    }       

    useEffect(()=>{
        if(answers.length < props.questionNumber){
            let updateAnswers = {...answers}  
           updateAnswers[props.questionNumber]=values
            setAnswers(updateAnswers)
        }     
    },[])


    return (
        <div className="select question-component">  
            <p className="question-intro">Q{props.questionNumber}.</p><span>
            <p className="question-intro">{props.question}</p></span>
            {values.map((row, i)=>{
                return(<ul key={i}>
                        <li style={{listStyleType:"none", textAlign:"left"}} >
                            {row.text}:&nbsp;
                                    <select  value={row.value} onChange={(e)=>handleChange(e,i)}>
                                        <option>--Select--</option>
                                        {selectArray.map((selection, index)=>{ 
                                            return <option key={index} value={selection}>{selection}</option>
                                        })}  
                                    </select>                         
                        </li>
                    </ul>
                )
                })
            }
        </div>
    );
}
 
export default SelectInput;