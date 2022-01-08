import React, { useContext } from "react";
import { TopTracksContext } from "../Contexts/TopTracksContext";
import "../Styles/Tracks.css";
function Tracks() {
  const { topTracks } = useContext(TopTracksContext);
  console.log(topTracks);
  return <div></div>;
}

export default Tracks;
