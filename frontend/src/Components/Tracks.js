import React, { useContext, useEffect } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";

import { TopTracksContext } from "../Contexts/TopTracksContext";
import Track from "./Track";

import "../Styles/Tracks.css";
const Tracks = () => {
  const { topTracks, setTopTracks } = useContext(TopTracksContext);
  useEffect(() => {
    axiosWithAuth()
      .get("/me/top/tracks?limit=50&offset=0&time_range=long_term")
      .then((res1) => {
        const top50 = res1.data.items;
        axiosWithAuth()
          .get("/me/top/tracks?limit=50&offset=49&time_range=long_term")
          .then((res) => {
            res.data.items.shift();
            setTopTracks([...top50, ...res.data.items]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(topTracks);
  return (
    <div className="tracks-container">
      {topTracks &&
        topTracks.map((track, index) => (
          <Track key={index} track={{ ...track, top: index + 1 }} />
        ))}
    </div>
  );
};

export default Tracks;
