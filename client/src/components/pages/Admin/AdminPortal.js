import logo from "../../../images/hiveicon.png";
import SaveSurvey from "./SaveSurvey";
import "../../../components/Form.css";
import "./AdminPortal.css";

const AdminPortal = ({rowId, copyOrOriginal}) => {
  return (
    <div className="admin-container">
      {/* <div className="admin-container-top"> */}
        <div className="admin-container-title-and-logo">
          {/* <h1>Admin Portal</h1>
          <img src={logo} alt="Hive logo" className="admin-logo" /> */}
        </div>
      {/* </div> */}
      <div className="admin-container-bottom">
        <SaveSurvey rowId={rowId} copyOrOriginal={copyOrOriginal} />
      </div>
    </div>
  );
};

export default AdminPortal;
