import React, { useContext } from "react";
import { TopTracksContext } from "../Contexts/TopTracksContext";

function Tracks() {
  const { topTracks } = useContext(TopTracksContext);
  console.log(topTracks);
  return <div></div>;
}

export default Tracks;
