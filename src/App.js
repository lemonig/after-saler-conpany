import logo from "./logo.svg";
import "./App.less";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Router from "./router/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
