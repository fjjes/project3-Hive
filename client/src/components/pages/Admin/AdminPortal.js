import logo from "../../../images/hiveicon.png";
import SaveSurvey from "./SaveSurvey";
import "../../../components/Form.css";
import "./AdminPortal.css";
import { useState } from "react";

const AdminPortal = ({rowId, copyOrOriginal, wholeSurveyInEditModeOrNot, setWholeSurveyInEditModeOrNot }) => {
  return (
    <div className="admin-container">
          
      <div className="admin-container-bottom">
        <SaveSurvey rowId={rowId} copyOrOriginal={copyOrOriginal} 
        wholeSurveyInEditModeOrNot={wholeSurveyInEditModeOrNot}
        setWholeSurveyInEditModeOrNot={setWholeSurveyInEditModeOrNot}
        />
      </div>
    </div>
  );
};

export default AdminPortal;
