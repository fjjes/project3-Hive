import React, { useState } from 'react';
import '../Form.css'

const SelectInput = (props) => {
    const [values, setValues]=useState(props.texts)
   
    let selectArray = [];
    let num= 1
    for(let i=0; i<values.length; i++){
        selectArray.push(num++)
        //console.log(selectArray)
    }
   
const handleChange = (e,i)=>{
    let newValues = [...values]
    newValues[i].value= e.target.value
    setValues(newValues)
    //props.onChangedValues(newValues)
}

   const handleSubmit=()=>{
    console.log(values)
  }

    return (
        <div className="select question-component">  
            <p className="question-intro">Q{props.questionNumber}.</p><span><p className="question-intro">{props.question}</p></span>
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
                 })}
        <div className="button-submit">
            <button onClick={handleSubmit} type="submit">Submit</button>
        </div>
        </div>
    );
}
 
export default SelectInput;