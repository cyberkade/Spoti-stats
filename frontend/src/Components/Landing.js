import React, { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import AxiosWithAuth from "../Utils/axiosWithAuth";
import Dashboard from "../Components/Dashboard.js";
import Loading from "../Common/Loading.js";

const Landing = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    AxiosWithAuth()
      .get("/users/kaderade18")
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(userInfo);
  return userInfo ? <Dashboard userInfo={userInfo} /> : <Loading />;
};

export default Landing;
