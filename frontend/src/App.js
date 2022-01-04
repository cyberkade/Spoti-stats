import React from "react";
import Login from "./Components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./Components/Landing";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return code ? <Landing code={code} /> : <Login />;
};

export default App;
