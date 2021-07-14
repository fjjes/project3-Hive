import React from "react";
import Narrative from "./questiontypes/Narrative";
import Comment from "./questiontypes/Comment";
import SelectInput from "./questiontypes/SelectInput";
import Slider from "./questiontypes/Slider";
import RadioButtons from "./questiontypes/RadioButtons";
import Checkboxes from "./questiontypes/Checkboxes";
import Matrix from './questiontypes/Matrix'
import MatrixNum from "./questiontypes/MatrixNum";
import PostalCode from "./questiontypes/PostalCode";
import "./Form.css"


const Form = () => {
  return (
    <div className="form-page">
      <div className="form-container">
        <Narrative />
        <SelectInput questionNumber={1}/>
        <Slider questionNumber={2}/>
        <RadioButtons questionNumber={3}/>
        <Checkboxes questionNumber={4}/>
        <Matrix/>
        <MatrixNum/>
        <PostalCode questionNumber={7}/>
        <Comment questionNumber={8}/>
      </div>
    </div>
  );
};
export default Form;
