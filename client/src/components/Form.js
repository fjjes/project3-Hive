import React from 'react'
import Narrative from './questiontypes/Narrative';
import Comment from './questiontypes/Comment';
import SelectInput from './questiontypes/SelectInput';

 const Form = () => {
    return (
        <div> 
           <Narrative/>
           <Comment/>
           <SelectInput />
        </div>
    )
}
export default  Form; 