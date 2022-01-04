import React, { useState, useEffect } from "react";
import Credentials from "./Utils/Credentials";
import axios from "axios";
import Login from "./Components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Components/Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return code ? <Dashboard code={code} /> : <Login />;
};

export default App;
