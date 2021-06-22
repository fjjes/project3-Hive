import React from "react";
import Narrative from "./questiontypes/Narrative";
import Comment from "./questiontypes/Comment";
import SelectInput from "./questiontypes/SelectInput";
import Slider from "./questiontypes/Slider";

const Form = () => {
  return (
    <div>
      <Narrative />
      <Comment />
      <SelectInput />
      <Slider />
    </div>
  );
};
export default Form;
