// import React, { useContext, useEffect } from "react";
// import axiosWithAuth from "../Utils/axiosWithAuth";
// import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import useWindowDimensions from "../Hooks/useWindowDimensions";

function Artist({ artist }) {
  const { height, width } = useWindowDimensions();

  const handleClick = () => {
    console.log(artist);
    console.log(width);
  };
  return (
    <div>
      {artist && width <= 1500 ? (
        <div
          style={{
            background: ` center / cover no-repeat url(${artist.images[1].url})`,
          }}
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
      ) : (
        <div
          style={{
            background: ` center / cover no-repeat url(${artist.images[0].url})`,
          }}
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
