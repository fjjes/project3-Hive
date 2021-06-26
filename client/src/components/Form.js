import React from "react";
import Narrative from "./questiontypes/Narrative";
import Comment from "./questiontypes/Comment";
import SelectInput from "./questiontypes/SelectInput";
import Slider from "./questiontypes/Slider";
import RadioButtons from "./questiontypes/RadioButtons";
import Checkboxes from "./questiontypes/Checkboxes";
import Matrix from './questiontypes/Matrix'
import "./Form.css"


const Form = () => {
  return (
    <div className="form-page">
      <div className="form-container">
        <Narrative />
        <SelectInput />
        <Slider />
        <RadioButtons />
        <Checkboxes />
        <Matrix />
        <Comment />
      </div>
    </div>
  );
};
export default Form;
