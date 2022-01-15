import React from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";

function Track({ track }) {
  const { height, width } = useWindowDimensions();
  const handleClick = () => {
    console.log(track);
    console.log(width);
  };
  return (
    <div>
      {track && width <= 1500 ? (
        <div
          style={{
            background: ` center / contain no-repeat url(${track.album.images[1].url})`,
          }}
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
      ) : (
        <div
          style={{
            background: ` center / contain no-repeat url(${track.album.images[0].url})`,
          }}
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
