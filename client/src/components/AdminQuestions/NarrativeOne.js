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
`This past year has challenged us and has had both positive and negative impacts on our working methods and ways of doing things within our office. It has allowed us to observe, experiment and ask key questions about how we want to future proof our organization. Should we implement a hybrid working model, how do we manage this, and what are the potential impacts on working environment and employees.

To define an efficient work organization that suits the vast majority as best as possible, we have chosen to probe the ground and imagine the rest together. Through this participatory approach, xxx wishes to allow you to express your needs and preferences as well as your concerns.
    
In this context, we suggest that you answer an online questionnaire, a task that should only take about fifteen minutes of your time. If necessary, you can save your responses and complete the survey later. Your input is essential for us to understand how the organization of your work environment can influence your ability to perform your tasks and help you be more efficient while taking your daily reality into account as much as possible. The work environment here refers to both the physical space, the working methods (teamwork, face-to-face and remote, work of concentration, creative exchanges, project modes, etc..), the technologies, and the services  available to you to perform your duties.`
  );

  const handleNarrativeChange = (e) => {
    setTempNarrative(e.target.value);
  };

  const onEditClicked = () => {
    setInEditMode({ status: true });
    props.setWholeSurveyInEditModeOrNot(true);
  };

  const onSave = () => {
    props.updateNarrative(tempNarrative);
    // console.log("clicked save");
    setInEditMode({ status: false });
    props.setWholeSurveyInEditModeOrNot(false);
  };

  const onCancel = () => {
    setTempNarrative(props.narrative);
    setInEditMode({ status: false });
    props.setWholeSurveyInEditModeOrNot(false);
  };

  useEffect(() => {
    setTempNarrative(props.narrative);
  }, [props.narrative]);

  return (
    <div className="question-component admin-question-component narrative-component">
      <div className="side-border-line">
        <p style={{ fontWeight: "bold", textAlign: "left", whiteSpace: "pre-wrap",}}>Narrative</p>
        <div className="question-and-buttons">
            {inEditMode.status ? (
              <div className="narrative-text-area editable">
              <textarea
                className="narrative-text-area-input"
                type="text"
                value={tempNarrative}
                onChange={handleNarrativeChange}
              />
            </div>
            ) : (
            <div className="narrative-text-area">
              <p style={{ whiteSpace: "pre-wrap",}}>{props.narrative} </p>
            </div>
            )}
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


