import React from "react";
import { useState } from "react";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import "../pages/Admin/AdminPortal.css";

function NarrativeOne(props) {
  const narrativePlaceholder =
    "This past year has challenged and has had both positive and negative impacts on our working methods and ways of doing things within our office. (Temporarily removed the remaining placeholder narrative text to make the component easier to work with...)";

  const [inEditMode, setInEditMode] = useState({ status: false });
  const [narrative, setNarrative] = useState(narrativePlaceholder);

  const handleNarrativeChange = (e) => {
    // console.log('narrative edit...')
    setNarrative(e.target.value);
  };

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  };

  const onSave = () => {
    props.updateNarrative(narrative);
    console.log("clicked save");
    setNarrative(narrative);
    setInEditMode({ status: false });
  };

  const onCancel = () => {
    console.log("clicked cancel");
    setNarrative(narrativePlaceholder); // Should probably be changed to revert to the last saved version rather than the original placeholder text
    setInEditMode({ status: false });
  };

  return (
    <div className="question-component admin-question-component narrative-component">
      <h2 style={{ textAlign: "left" }}>Narrative</h2>
      <div className="questionAndButtons">
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
            <div className="edit-button">
              <button
                className="clear icn1"
                title="Save"
                onClick={() => onSave()}
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
            <div className="edit-button">
              <button
                className="clear icn3"
                title="Edit"
                onClick={() => onEditClicked()}
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
