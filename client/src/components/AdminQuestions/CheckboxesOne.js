// import Checkboxes from "../questiontypes/Checkboxes";

// const CheckboxesOne = ({questionNumber}) => {
//   return ( 
//     <div className="checkboxes-one">
//       <Checkboxes
//         question={"Select up to three options:"}
//         questionNumber={questionNumber}
//         texts={[
//           { checked: false, value: "Option 1" },
//           { checked: false, value: "Option 2" },
//           { checked: false, value: "Option 3" },
//           { checked: false, value: "Option 4" },
//           { checked: false, value: "Option 5" },
//           { checked: false, value: "Option 6" },
//           { checked: false, value: "Option 7" },
//           { checked: false, value: "Option 8" },
//         ]}
//       />
//     </div>
//    );
// }
 
// export default CheckboxesOne;

import React from 'react';
const options=[
  { checked: false, value: "Option 1" },
  { checked: false, value: "Option 2" },
  { checked: false, value: "Option 3" },
  { checked: false, value: "Option 4" },
  { checked: false, value: "Option 5" },
  { checked: false, value: "Option 6" },
  { checked: false, value: "Option 7" },
  { checked: false, value: "Option 8" },
]
const question = "This is the question."
const questionNumber = 8
function Checkboxes() {

  return (
    <div className="question-component">
      <form className="checkbox-form-control">
        <p className="question-intro">Q{questionNumber}.</p><span>
        <p className="question-intro">{question}</p></span>
        <div className="checkbox-form-group">
          {options.map((option, index) => {
            return(<div key={index}>
              <input
                type="checkbox"
                name="option"
                id={option.value}
                value={option.value}
              />
              <label
                htmlFor={option.value}
                key={option.value}
              >
                {option.value}
              </label>
            </div>
            )})
        }
          {/* <input
            type="text"
            label={`Add details for option ${options.length}.`}
            id="outlined-basic"
            name="option"
            value={comment}
            /> */}
        </div>
      </form>
    </div>
  );
}

export default Checkboxes;
