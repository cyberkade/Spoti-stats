import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Artist from "./Artist";
import Track from "./Track";
import "../Styles/Carousel.css";

function Carousel({ top5 }) {
  const navigate = useNavigate();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentArtist, setCurrentArtist] = useState(0);

  const handleArtist = () => {
    if (currentArtist === 4) {
      setCurrentArtist(0);
    } else setCurrentArtist(currentArtist + 1);
  };
  const handleTrack = () => {
    if (currentTrack === 4) {
      setCurrentTrack(0);
    } else setCurrentTrack(currentTrack + 1);
  };
  console.log(top5[currentTrack]);
  // setInterval(() => {
  //   handleArtist();
  //   handleTrack();
  // }, 5000);
  return (
    <div className="carousel-container">
      {top5[0].album && (
        <>
          <Track track={top5[currentTrack]} />
          <button
            className="stuck"
            onClick={() => {
              navigate("/tracks");
            }}
          >
            View Tracks
          </button>
        </>
      )}

      {top5[0].images && (
        <>
          <Artist artist={top5[currentArtist]} />
          <button
            className="stuck"
            onClick={() => {
              navigate("/artists");
            }}
          >
            View Artists
          </button>
        </>
      )}
    </div>
  );
}

export default Carousel;
