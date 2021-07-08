// import writeJsonFile from "write-json-file"
import { useState } from "react";
import "../../../components/Form.css";
import "./AdminPortal.css";
import NewSurvey from "./NewSurvey";
import FindSurvey from "./FindSurvey";

const AdminPortal = ({ questionBlock }) => {
  const [view, setView] = useState("");

  // const question= questionBlock?.question //if questionBlock is defined, set question to be questionBlock.question, otherwise set it as undefined
  // const texts = questionBlock?.answerOptions
  // const questionNumber=questionBlock?.questionNumber

  return (
    <div className="admin-container">
      <div className="admin-container-top">
        <h1>Admin Portal</h1>

        <div className="main-admin-buttons">
          <button onClick={() => setView("find")}>Find existing surveys</button>
          <button onClick={() => setView("new")}>Create new survey</button>
        </div>
      </div>
      <div className="admin-container-bottom" style={view === "" ? {padding: "0"} : null}>
        {view === "find" ? <FindSurvey /> : null}
        {view === "new" ? <NewSurvey /> : null}
      </div>
    </div>
  );
};

export default AdminPortal;
