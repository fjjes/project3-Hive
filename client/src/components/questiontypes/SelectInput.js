// import { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//       minWidth: 80,
//     },
    
//   }));

// const SelectInput = () => {
//     const classes = useStyles();
//     const [value, setValue]= useState()
//     //const [inputRank, setIntputRank]= useState('')
    
//     const interests= [
//         'Rethinking workspaces in the company',
//         'Review the organization of meetings Rethinking moments',
//         'Spaces of conviviality',
//         'Do not change anything',
//         'Other'
//       ]

//     let selectArray = [];
//     let num= 1
//     for(let i=0; i<interests.length; i++){
//         selectArray.push(num++)
//     }
   
// //    const handleSubmit=()=>{
// //     console.log(comment)
// //     setComment('') //input clears out when clicked on submit
// //   }

//     return (
//         <div className="select">
//             <p>In your opinion, what are the necessary and complementary organizational points for teleworking that should be implemented within the company? Many Answers are possible. Please rank the following in order of interest:</p>
//             <ul>
//                 {interests.map((interest, i)=>{
//                     return(
//                         <li key={i} style={{listStyleType:"none", textAlign:"left"}} >
//                             {interest}:
//                             <span style={{marginLeft:"10px"}}>
//                                 <FormControl className={classes.formControl}>
//                                     <Select  value={value} onChange={(e)=>setValue(e.target.value)}>
//                                         {selectArray.map((selection, index)=>{ 
//                                             return <MenuItem key={index} value={selection}>{selection}</MenuItem>
//                                         })}   
//                                     </Select>
//                                     {console.log(interest, value)}
//                                 </FormControl>
//                             </span>
                           
//                         </li>
//                         )
//                 })}
//             </ul>
// {/* 
//             <button onClick={handleSubmit} type="submit">
//             submit
//            </button> */}
//         </div>
//     );
// }
 
// export default SelectInput;