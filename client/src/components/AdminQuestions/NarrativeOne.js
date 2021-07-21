import React, { useContext } from "react";
import { useState, useEffect } from "react";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";

function NarrativeOne({passStuff}) {
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [narrative, setNarrative] = useState(
    "Insert narrative text here... Lorem ipsum dolor sit amet consectetur, adipisicing elit. In autem laborum natus dicta amet quis quaerat a nobis aspernatur, ex commodi accusantium, assumenda sed optio possimus impedit quam quidem exercitationem neque cum corrupti maiores id."
  );

  const handleNarrativeChange = (e) => {
    console.log('narrative edit...')
    setNarrative(e.target.value)
  }

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  };
  
  const onSave = () => {
    console.log("clicked save");
    setNarrative(narrative)
    setInEditMode({ status: false });
    passStuff(narrative)
  };

  const onCancel=()=>{
    console.log("clicked cancel")
    setInEditMode({status:false })
  }
  
  console.log("The narrative that works! (from NarrativeOne): ", narrative)  // This one is correct!!!

  useEffect(()=>{
    console.log("Narrative from useEffect: ", narrative)
 },[narrative])

  return (
    <div className="question-component admin-question-component narrative-component">
      <h2 style={{ textAlign: "left" }}>Narrative</h2>
      <div className="narrative">
        <div className="narrative-text-area">
          {inEditMode.status ? (
            <textarea
              className="narrative-text-area-input"
              rows="10"
              type="text"
              value={narrative}
              onChange={handleNarrativeChange}
            />
          ) : (
            <p>{narrative}</p>
          )}
        </div>
        <div className="narrative-buttons">
          {inEditMode.status ? (
            <div>
              <button
                className="clear icn1"
                title="Save"
                onClick={() =>
                  onSave()
                  // row._id, company, version, surveyNum
                }
              >
                <GiIcons.GiSaveArrow />
              </button>
              <span className="slash" style={{ color: "#fff" }}>
                /
              </span>
              <button
                className="clear icn2"
                title="Cancel"
                onClick={() => onCancel()}
                >
                <MdIcons.MdCancel />
              </button>
                </div>
              ) : (
            <div>
              <button
                className="clear icn3"
                title="Edit"
                onClick={
                  () => onEditClicked()
                  // narrative
                }
              >
                <BsIcons.BsPencilSquare />
              </button>
              <span className="slash" style={{ color: "#fff" }}>
                /
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NarrativeOne;
