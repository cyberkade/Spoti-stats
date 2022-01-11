import React, { useContext, useEffect } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";

import { TopTracksContext } from "../Contexts/TopTracksContext";
import Track from "./Track";

import "../Styles/Tracks.css";
function Tracks() {
  const { topTracks, setTopTracks } = useContext(TopTracksContext);
  useEffect(() => {
    axiosWithAuth()
      .get("/me/top/tracks?limit=50&offset=0&time_range=long_term")
      .then((res) => {
        setTopTracks(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="tracks-container">
      {topTracks &&
        topTracks.map((track, index) => (
          <Track key={index} track={{ ...track, top: index + 1 }} />
        ))}
    </div>
  );
}

export default Tracks;
