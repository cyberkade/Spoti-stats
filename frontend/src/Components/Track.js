import React from "react";

function Track({ track }) {
  const handleClick = () => {
    console.log(track);
  };
  return (
    <div>
      {track && (
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
