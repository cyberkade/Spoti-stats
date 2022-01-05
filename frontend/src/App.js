import React, { useEffect } from "react";
import Login from "./Components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./Components/Landing";
import Dashboard from "./Components/Dashboard";
import Callback from "./Callback";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";

const App = () => {
  // let [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const code = searchParams.get("code");
  // useEffect(() => {
  //   checkCode(code);
  // }, []);

  // const checkCode = (code) => {
  //   if (code) {
  //     navigate("/landing", { state: code });
  //   } else {
  //     // navigate("/", { replace: true });
  //   }
  // };
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/dashboard" element={<Landing />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default App;
