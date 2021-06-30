import React, { useState } from "react";
import '../Form.css'

const Matrix = (props) => {
  const [values, setValues]=useState(props.texts)

  const handleChange = (e, i) => {
    let newValues = [...values];
    newValues[i].value = e.target.value;
    setValues(newValues);
    props.onChangedValues(newValues)
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <div className="matrix question-component">
        <p className="question-intro">Q{props.questionNumber}) {props.question}</p>
        <table>
          <tbody>
           <tr>
             <th></th>
             {props.columns.map((cl, i)=> {
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
                  {props.columns.map((col, index)=>{
                      return(
                        <td key={index} onChange={(e) => handleChange(e, i)}>
                          <input type='radio' value={col}/>
                        </td>
                      )
                  })}
                </tr>
              )
            })
            }
          </tbody>
        </table>
        
      <div className="button-submit">
        <button onClick={handleSubmit} type="submit">Submit</button>
      </div>
    </div>
  );
};

export default Matrix;
