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
        <Matrix 
        question={"Please indicate for each of the factors below their importance to you in the performance of your work, then your level of satisfaction with these factors in your current work environment:"}
        texts={[
          {text: "Ability to concentrate", value: "" },
          {text: "Ability to conduct telephone conversations", value: "" },
          {text: "Ability to find a meeting room within a reasonable timeframe",value: ""},
          {text: "Ability to access collaborative spaces for informal exchanges with my colleagues",value: ""},
          {text: "Ability to conduct confidential conversations", value: "" },
          {text: "Quality of IT and telephone tools (excluding workstations) made available (connection tools and screens in meeting rooms, etc.)",value: ""},
          {text: "Ability to work in the office with remote contacts", value: "" },
          {text: "Ability to easily switch between face-to-face work and work at home",value: ""},
          {text: "Quality of the environment near my workplace (neighborhood, shops, services, restaurants, etc.)",value: ""}
        ]}
        columns={[
          "Very Satisfied",
          "Satisfied",
          "Neither satisfied nor dissatisfied",
          "Dissatisfied",
          "Very dissatisfied"
        ]}
        space1={2} space2={3} space3={9} space4={2}
        />
        <Matrix 
        question={"Please rate the importance of followings from 1 to 10:"}
        texts={[
          {text: "text 1", value: "" },
          {text: "text 2", value: "" },
          {text: "text 3",value: ""},
          {text: "text 4",value: ""},
          {text: "text 5", value: "" },
        ]}
        columns={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
        space1={2} space2={3} space3={8} space4={1}
        />
        <Comment />
      </div>
    </div>
  );
};
export default Form;
