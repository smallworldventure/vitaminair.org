import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Pages/dashboard";
import Donationers from "./components/Pages/donationers";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/donationers" component={Donationers} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;