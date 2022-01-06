import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import Navbar from "./Navbar";
import "../Styles/Dashboard.css";
// import AxiosWithAuth from "../Utils/axiosWithAuth";
const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <Navbar />
      <p>Welcome {user.display_name}!</p>
    </>
  );
};

export default Dashboard;
