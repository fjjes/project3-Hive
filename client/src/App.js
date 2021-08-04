import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPortal from "./components/pages/Admin/AdminPortal";
import AdminPortalEdit from "./components/pages/Admin/AdminPortalEdit";
import Logo from "./components/pages/LandingPage/Logo";
import Navbar from "./components/Navbar/Navbar";
import FindSurvey from "./components/pages/Admin/FindSurvey";
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
            <Logo />
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
            <Route path="/data-visualization/:surveyId">
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
