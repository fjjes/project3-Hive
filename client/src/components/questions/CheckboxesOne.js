import Checkboxes from "../questiontypes/Checkboxes";

const CheckboxesOne = ({questionNumber}) => {
  return ( 
    <div className="checkboxes-one">
      <Checkboxes
        question={"Select up to three options:"}
        questionNumber={questionNumber}
        texts={[
          { checked: false, value: "Option 1" },
          { checked: false, value: "Option 2" },
          { checked: false, value: "Option 3" },
          { checked: false, value: "Option 4" },
          { checked: false, value: "Option 5" },
          { checked: false, value: "Option 6" },
          { checked: false, value: "Option 7" },
          { checked: false, value: "Option 8" },
        ]}
      />
    </div>
   );
}
 
export default CheckboxesOne;