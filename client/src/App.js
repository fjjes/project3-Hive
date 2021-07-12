import "./App.css";
//import Form from "./components/Form";
import SurveyQuestionPage from "./components/pages/SurveyQuestionPage";
import Start from "./components/pages/LandingPage/Start";
import AdminPortal from "./components/pages/Admin/AdminPortal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Logo from "./components/pages/LandingPage/Logo";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Logo />
          </Route>
          <Route path="/start">
            <Start />
          </Route>
          <Route path="/survey">
            <SurveyQuestionPage />
          </Route>
          <Route path="/admin">
            <AdminPortal />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
