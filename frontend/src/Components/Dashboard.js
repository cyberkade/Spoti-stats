import React, { useContext } from "react";
import { TopTracksContext } from "../Contexts/TopTracksContext";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import Navbar from "./Navbar";
import "../Styles/Dashboard.css";
import Artists from "./Artists";
import Tracks from "./Tracks";
const Dashboard = () => {
  const { topTracks } = useContext(TopArtistsContext);
  return (
    <>
      <Navbar />
      <Artists />
      <Tracks />
    </>
  );
};

export default Dashboard;
