import React, { useContext } from "react";
import { TopTracksContext } from "../Contexts/TopTracksContext";
import "../Styles/Tracks.css";

function Track({ track }) {
  const handleClick = () => {
    console.log(track);
  };
  return (
    <div>
      {track && (
        <div
          style={{ backgroundImage: `url(${track.album.images[1].url})` }}
          className="trackImg"
          alt="top 50 artist"
        >
          <span className="top-num-display" onClick={() => handleClick()}>
            {track.top}
          </span>
          <p className="top-text-display" onClick={() => handleClick()}>
            {track.name}
          </p>
        </div>
      )}
    </div>
  );
}

export default Track;
