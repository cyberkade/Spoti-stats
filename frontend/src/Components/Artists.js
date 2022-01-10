import React, { useContext } from "react";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import Artist from "./Artist";
import "../Styles/Artists.css";
function Artists() {
  const { topArtists, setTopArtists } = useContext(TopArtistsContext);
  console.log(topArtists);
  console.log(setTopArtists);

  return (
    <div className="artists-container">
      {topArtists &&
        topArtists.map((artist, index) => (
          <Artist key={index} artist={artist} />
        ))}
    </div>
  );
}

export default Artists;
