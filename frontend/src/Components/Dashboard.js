import React, { useContext, useState, useEffect } from "react";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopTracksContext } from "../Contexts/TopTracksContext";

import "../Styles/Dashboard.css";
import Carousel from "./Carousel";

const Dashboard = () => {
  const { topArtists } = useContext(TopArtistsContext);
  const { topTracks } = useContext(TopTracksContext);
  // eslint-disable-next-line
  const [isLoggedIn, setLoggedIn] = useState();

  useEffect(() => {
    setLoggedIn(true);
  }, []);

  return (
    <>
      <section>
        <Carousel top5={topArtists} />
        {/* {top5Artists.map((artist, index) => (
         <img
          src={artist.images[1].url}
          className="artistImg"
          key={index}
          alt="top 5 listened to artist"
        />
      ))}  */}
        <Carousel top5={topTracks} />
        {/* 
      {top5Tracks.map((track, index) => (
        <img
          src={track.album.images[1].url}
          className="trackImg"
          key={index}
          alt={track.name}
        />
      ))} */}
      </section>
    </>
  );
};

export default Dashboard;
