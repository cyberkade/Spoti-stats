import React, { useContext } from "react";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";

function Artists() {
  const { topArtists } = useContext(TopArtistsContext);
  console.log(topArtists);
  return <div></div>;
}

export default Artists;
