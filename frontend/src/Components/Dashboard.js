import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../Utils/axiosWithAuth";
const Dashboard = ({ userInfo, setUserInfo }) => {
  console.log(userInfo);
  return (
    <>
      <p>Welcome {userInfo.display_name}!</p>
      <img src={userInfo.images[0].url} alt="user profile" />
    </>
  );
};

export default Dashboard;
