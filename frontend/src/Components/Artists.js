import React, { useContext } from "react";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import "../Styles/Artists.css";
function Artists() {
  const { topArtists } = useContext(TopArtistsContext);
  console.log(topArtists);

  return (
    <div>
      {topArtists.map((artist, index) => (
        <img
          src={artist.images[1].url}
          className="artistImg"
          key={index}
          alt="top 50 artist"
        />
      ))}
    </div>
  );
}

export default Artists;
