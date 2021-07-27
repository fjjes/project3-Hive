import "./App.css";
//import SurveyQuestionPage from "./components/pages/SurveyQuestionPage";
import AdminPortal from "./components/pages/Admin/AdminPortal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Logo from "./components/pages/LandingPage/Logo";
import Navbar from "./components/Navbar/Navbar";
import FindSurvey from "./components/pages/Admin/FindSurvey";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/survey/:surveyId'>
            <Logo/>
              {/* <SurveyQuestionPage/> */}
          </Route>
          <div>
            <Navbar/>
            <Route exact path='/create-new' >
              <AdminPortal/>
            </Route>
            <Route path='/find-list'>
              <FindSurvey/>
            </Route>
            {/* <Route path='/data-vis'>
              <DataVisualization/>
            </Route> */}
            <Route exact path='/' >
              <AdminPortal/>
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
