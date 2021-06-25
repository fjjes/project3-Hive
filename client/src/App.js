import "./App.css";
import Form from "./components/Form";
import Start from "./components/Landing Page/Start";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/Form">
            <Form />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
