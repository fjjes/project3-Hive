// import writeJsonFile from "write-json-file"
import { useEffect, useState } from "react";
import "../../../components/Form.css";
import "./AdminPortal.css";
import NewSurvey from "./NewSurvey";
import FindSurvey from "./FindSurvey";
import logo from "../../../images/hiveicon.png"

const AdminPortal = ({ questionBlock }) => {
  const [view, setView] = useState("");
  const [dividerLine, setDividerLine] = useState("none")

  // const question= questionBlock?.question //if questionBlock is defined, set question to be questionBlock.question, otherwise set it as undefined
  // const texts = questionBlock?.answerOptions
  // const questionNumber=questionBlock?.questionNumber


  return (
    <div className="admin-container">
      <div className="admin-container-top">
        <div className="admin-container-title-and-logo">
          <h1>Admin Portal</h1>
          <img src={logo} alt="Hive logo" className="admin-logo"/>
        </div>
        <div className="main-admin-buttons" style={{borderBottom: dividerLine}}>
          <button onClick={() => {
            setDividerLine("3px rgba(0, 0, 0, 0.2) solid")
            setView("find")
            }}>Find existing surveys</button>
          <button onClick={() => {
            setDividerLine("3px rgba(0, 0, 0, 0.2) solid")
            setView("new")
            }}>Create new survey</button>
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
