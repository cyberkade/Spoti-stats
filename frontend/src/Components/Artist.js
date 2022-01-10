import React, { useContext } from "react";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
function Artist({ artist }) {
  const handleClick = () => {
    console.log(artist);
  };
  return (
    <div>
      {artist && (
        <div
          style={{ backgroundImage: `url(${artist.images[1].url})` }}
          className="artistImg"
          alt="top 50 artist"
        >
          <span className="top-num-display" onClick={() => handleClick()}>
            {artist.top}
          </span>
          <p className="top-text-display" onClick={() => handleClick()}>
            {artist.name}
          </p>
        </div>
      )}
    </div>
  );
}

export default Artist;
