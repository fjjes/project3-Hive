// import writeJsonFile from "write-json-file"
import { useState } from "react";
import logo from "../../../images/hiveicon.png"
import NewSurvey from "./NewSurvey";
import FindSurvey from "./FindSurvey";
import "../../../components/Form.css";
import "./AdminPortal.css";

const AdminPortal = () => {
  const [view, setView] = useState("new");
  const [findTabColour, setFindTabColour] = useState("grey")
  const [newTabColour, setNewTabColour] = useState("grey")

  // *** Not working - trying to get active tab to be a different colour ***
  const active = "#f59645" // Orange
  const inactive = "#bce6f8" // Dark blue

  return (
    <div className="admin-container">
      <div className="admin-container-top">
        <div className="admin-container-title-and-logo">
          <h1>Admin Portal</h1>
          <img src={logo} alt="Hive logo" className="admin-logo"/>
        </div>
        {/* <div className="main-admin-buttons">
          <button style={{backgroundColour: newTabColour}} onClick={() => {
            setView("new")
            setFindTabColour(inactive)
            setNewTabColour(active)
            }}>Create New Survey</button>
          <button style={{backgroundColour: findTabColour}} onClick={() => {
            setView("find")
            setFindTabColour(active)
            setNewTabColour(inactive)
            }}>Find Existing Surveys</button>
        </div> */}
      </div>
      <div className="admin-container-bottom" style={view === "" ? {padding: "0"} : null}>
        {view === "find" ? <FindSurvey /> : null}
        {view === "new" ? <NewSurvey /> : null}
      </div>
    </div>
  );
};

export default AdminPortal;
