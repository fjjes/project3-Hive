import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../../../images/hiveicon.png";
import EditSurvey from "./EditSurvey";
import "../../../components/Form.css";
import "./AdminPortal.css";

const AdminPortalEdit = () => {
    const {surveyId}= useParams()
    // const [survey, setSurvey]=useState({})
        
    // useEffect(() => {
    //     const getSurvey = async () => {
    //         let response = await fetch(`/api/survey/${surveyId}`);
    //         let data = await response.json();
    //         setSurvey(data)            
    //     };
    //     getSurvey();
    // }, [surveyId]);

  return (
    <div className="admin-container">
      <div className="admin-container-top">
        <div className="admin-container-title-and-logo">
          <h1>Admin Portal</h1>
          <img src={logo} alt="Hive logo" className="admin-logo" />
        </div>
      </div>
      <div className="admin-container-bottom">
        <EditSurvey 
        surveyId={surveyId} 
        // survey={survey}
         />
      </div>
    </div>
  );
};

export default AdminPortalEdit;