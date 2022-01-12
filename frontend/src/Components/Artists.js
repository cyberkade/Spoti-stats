import React, { useContext, useEffect } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";

import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import Artist from "./Artist";

import "../Styles/Artists.css";
function Artists() {
  const { topArtists, setTopArtists } = useContext(TopArtistsContext);
  useEffect(() => {
    axiosWithAuth()
      .get("/me/top/artists?limit=50&offset=0&time_range=long_term")
      .then((res1) => {
        const top50 = res1.data.items;
        axiosWithAuth()
          .get("/me/top/artists?limit=50&offset=49&time_range=long_term")
          .then((res) => {
            res.data.items.shift();
            setTopArtists([...top50, ...res.data.items]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="artists-container">
      {topArtists &&
        topArtists.map((artist, index) => (
          <Artist key={index} artist={{ ...artist, top: index + 1 }} />
        ))}
    </div>
  );
}

export default Artists;
