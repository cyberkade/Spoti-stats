import React, { useContext } from "react";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopTracksContext } from "../Contexts/TopTracksContext";

import Navbar from "./Navbar";
import "../Styles/Dashboard.css";
import Artists from "./Artists";
import Tracks from "./Tracks";
import Carousel from "./Carousel";
const Dashboard = () => {
  const { topArtists } = useContext(TopArtistsContext);
  const { topTracks } = useContext(TopTracksContext);
  let top5Artists = [];
  let top5Tracks = [];
  if (topArtists && topTracks) {
    for (let i = 0; i < 5; i++) {
      top5Artists.push(topArtists[i]);
      top5Tracks.push(topTracks[i]);
    }
  }

  console.log(top5Artists);
  console.log(top5Tracks);
  return (
    <>
      <Navbar />

      <section>
        {top5Artists.length > 0 && <Carousel top5={top5Artists} />}
        {/* {top5Artists.map((artist, index) => (
         <img
          src={artist.images[1].url}
          className="artistImg"
          key={index}
          alt="top 5 listened to artist"
        />
      ))}  */}
        {top5Tracks.length > 0 && <Carousel top5={top5Tracks} />}
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
