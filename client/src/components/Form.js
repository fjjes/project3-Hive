import React from "react";
import Narrative from "./questiontypes/Narrative";
import Comment from "./questiontypes/Comment";
import SelectInput from "./questiontypes/SelectInput";
import Slider from "./questiontypes/Slider";
import RadioButtons from "./questiontypes/RadioButtons";
import Checkboxes from "./questiontypes/Checkboxes";
import Matrix from './questiontypes/Matrix'


const Form = () => {
  return (
    <div>
      <Narrative />
      <Comment />
      <SelectInput />
      <Slider />
      <RadioButtons/>
      <Checkboxes />
      <Matrix />
    </div>
  );
};
export default Form;
