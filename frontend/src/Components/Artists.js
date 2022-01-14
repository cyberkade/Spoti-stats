import React, { useContext, useEffect } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";
import Artist from "./Artist";
import Loading from "../Common/Loading";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";

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
    // eslint-disable-next-line
  }, []);
  return (
    <div className="artists-container">
      {topArtists && topArtists.length > 5 ? (
        topArtists.map((artist, index) => (
          <Artist key={index} artist={{ ...artist, top: index + 1 }} />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Artists;
