import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import Navbar from "./Navbar";
import "../Styles/Dashboard.css";
// import AxiosWithAuth from "../Utils/axiosWithAuth";
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { topArtists } = useContext(TopArtistsContext);
  console.log(user);
  console.log(topArtists);
  return (
    <>
      <Navbar />
      <p>Welcome {user.display_name}!</p>
    </>
  );
};

export default Dashboard;
