import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
// import AxiosWithAuth from "../Utils/axiosWithAuth";
const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <p>Welcome {user.display_name}!</p>
      <img src={user.images[0].url} alt="user profile" />
    </>
  );
};

export default Dashboard;
