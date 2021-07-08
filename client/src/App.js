import "./App.css";
//import Form from "./components/Form";
import SurveyQuestionPage from "./components/pages/SurveyQuestionPage";
import Start from "./components/pages/LandingPage/Start";
import AdminPortal from "./components/pages/Admin/AdminPortal"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          {/* <Route path="/Form">
            <Form />
          </Route> */}
          <Route path='/survey'>
            <SurveyQuestionPage />
          </Route>
          <Route path='/admin'>
            <AdminPortal />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
