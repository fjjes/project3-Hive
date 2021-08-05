import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPortal from "./components/pages/Admin/AdminPortal";
import AdminPortalEdit from "./components/pages/Admin/AdminPortalEdit";
import SurveyLandingPage from "./components/pages/LandingPage/SurveyLandingPage";
import Navbar from "./components/Navbar/Navbar";
import FindSurvey from "./components/pages/Admin/FindSurvey";
import Map from "./components/DataVisual/Map";
import DataVisualization from "./components/DataVisual/DataVisualization";
import "./App.css";

function App() {
  const [rowId, setRowId] = useState();

  const resetRowId = () => {
    setRowId()
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/survey/:surveyId">
            <SurveyLandingPage />
          </Route>
          <div>
            <Navbar />
            <Route exact path="/create-new">
              <AdminPortal rowId={rowId} />
            </Route>
            <Route path="/find-list">
              <FindSurvey setRowId={setRowId} resetRowId={resetRowId} />
            </Route>
            <Route exact path="/edit-survey/:surveyId">
              <AdminPortalEdit/>
            </Route>
            <Route path="/map/:surveyId">
              <Map/>
            </Route>
            <Route path="/data-visual">
              <DataVisualization/>
            </Route>
            <Route exact path="/">
              <AdminPortal />
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
