import React from "react";
import useAuth from "../Hooks/useAuth";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  console.log(accessToken);
  return <div>{code}</div>;
};

export default Dashboard;
