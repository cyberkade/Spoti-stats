import React, { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import AxiosWithAuth from "../Utils/axiosWithAuth";
import Dashboard from "../Components/Dashboard.js";
const Landing = ({ code }) => {
  const accessToken = useAuth(code);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    AxiosWithAuth()
      .get("/users/kaderade18")
      .then((res) => {
        setUserInfo(res.data);
      });
  }, []);
  console.log(accessToken);
  console.log(userInfo);
  return userInfo ? <Dashboard userInfo={userInfo} /> : <div>Loading!</div>;
};

export default Landing;
