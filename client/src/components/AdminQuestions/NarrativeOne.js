import React, { useEffect } from "react";
import { useState } from "react";
import "../pages/Admin/AdminPortal.css";
import {
  EditButton,
  SaveButton,
  CancelButton,
} from "./AdminEditButtons";

function NarrativeOne(props) {
  const [inEditMode, setInEditMode] = useState({ status: false });
  const [tempNarrative, setTempNarrative] = useState(
    "This past year has challenged and has had both positive and negative impacts on our working methods and ways of doing things within our office. (Temporarily removed the remaining placeholder narrative text to make the component easier to work with...)"
  );

  const handleNarrativeChange = (e) => {
    setTempNarrative(e.target.value);
  };

  const onEditClicked = () => {
    console.log("clicked edit");
    setInEditMode({ status: true });
  };

  const onSave = () => {
    props.updateNarrative(tempNarrative);
    console.log("clicked save");
    setInEditMode({ status: false });
  };

  const onCancel = () => {
    console.log("clicked cancel");
    setTempNarrative(props.narrative);
    setInEditMode({ status: false });
  };

  useEffect(() => {
    setTempNarrative(props.narrative);
  }, [props.narrative]);

  return (
    <div className="question-component admin-question-component narrative-component">
      <div className="side-border-line">
        <p style={{ fontWeight: "bold", textAlign: "left" }}>Narrative</p>
        <div className="question-and-buttons">
          <div className="narrative-text-area">
            {inEditMode.status ? (
              <textarea
                className="narrative-text-area-input"
                rows="10"
                type="text"
                value={tempNarrative}
                onChange={handleNarrativeChange}
              />
            ) : (
              <p>{props.narrative}</p>
            )}
          </div>
        </div>
      </div>

      <div className="edit-buttons-group">
          {inEditMode.status ? (
            <div className="edit-button">
              <SaveButton onSave={onSave} />
              <CancelButton onCancel={onCancel} />
            </div>
          ) : (
            <div className="edit-button">
              <EditButton onEditClicked={onEditClicked} />
            </div>
          )}
        </div>
    </div>
  );
}

export default NarrativeOne;
