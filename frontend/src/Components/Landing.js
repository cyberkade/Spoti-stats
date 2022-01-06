import React, { useEffect, useContext } from "react";
import AxiosWithAuth from "../Utils/axiosWithAuth";
import Dashboard from "../Components/Dashboard.js";
import Loading from "../Common/Loading.js";
import { UserContext } from "../Contexts/UserContext";

const Landing = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    AxiosWithAuth()
      .get("/users/kaderade18")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(user);
  return user ? <Dashboard /> : <Loading />;
};

export default Landing;
