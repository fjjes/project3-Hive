import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login/LoginPage";
import AdminPortal from "./components/pages/Admin/AdminPortal";
// import AdminPortalEdit from "./components/pages/Admin/AdminPortalEdit";
import SurveyLandingPage from "./components/pages/LandingPage/SurveyLandingPage";
import Navbar from "./components/Navbar/Navbar";
import FindSurvey from "./components/pages/Admin/FindSurvey";
import Map from "./components/DataVisual/Map";
import DataVisualization from "./components/DataVisual/DataVisualization";
import SurveyAnswersPage from "./components/pages/Admin/SurveyAnswersPage";
import "./App.css";


function App() {
  const [rowId, setRowId] = useState();
  const [copyOrOriginal, setCopyOrOriginal] = useState();

  const resetRowId = () => {
    setRowId()
  }

  const resetCopyOrOriginal = () => {
    setCopyOrOriginal()
  }

  return (
      <Router>
        <Switch>
        <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/survey/:surveyId">
            <SurveyLandingPage />
          </Route>
          <div>
            <Navbar />
            
              <Route exact path="/create-new">
              <AdminPortal rowId={rowId} copyOrOriginal={copyOrOriginal} />
              </Route>
            
            <Route path="/existing-surveys">
              <FindSurvey setRowId={setRowId} resetRowId={resetRowId} setCopyOrOriginal={setCopyOrOriginal} resetCopyOrOriginal={resetCopyOrOriginal} />
            </Route>
          
            {/* <Route exact path="/edit-survey/:surveyId">
              <AdminPortalEdit/>
            </Route> */}
            <Route path="/map/:surveyId">
              <Map/>
            </Route>
            <Route path="/data-visual">
              <DataVisualization/>
            </Route>
            <Route path="/data-collected">
              <SurveyAnswersPage/>
            </Route>
          </div>
        </Switch>
      </Router>
  );
}

export default App;
