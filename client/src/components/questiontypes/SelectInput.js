import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 80,
    },
    
  }));

const SelectInput = () => {
    const classes = useStyles(); 
    const [values, setValues]= useState([
        {text:'Rethinking workspaces in the company', value:''},
        {text:'Review the organization of meetings Rethinking moments', value:''},
        {text:'Spaces of conviviality', value:''},
        {text:'Do not change anything', value:''},
        {text:'Other', value:''}
    ])

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
}

   const handleSubmit=()=>{
    console.log(values)
  }

    return (
        <div className="select">
            <p>In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many Answers are possible. Please rank the following in order of interest:</p>
                {values.map((row, i)=>{
                    return(<ul key={i}>
                            <li style={{listStyleType:"none", textAlign:"left"}} >
                                {row.text}:
                                    <FormControl className={classes.formControl}>
                                        <Select  value={row.value} onChange={(e)=>handleChange(e,i)}>
                                            {selectArray.map((selection, index)=>{ 
                                                return <MenuItem key={index} value={selection}>{selection}</MenuItem>
                                            })}   
                                        </Select>
                                    </FormControl>                            
                            </li>
                        </ul>
                         )
                 })}
        <div style={{textAlign:"left"}}>
            <button onClick={handleSubmit} type="submit">submit</button>
        </div>
        </div>
    );
}
 
export default SelectInput;