import React, { useEffect, useContext } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";
import Dashboard from "../Components/Dashboard.js";
import Loading from "../Common/Loading.js";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopTracksContext } from "../Contexts/TopTracksContext";

const Landing = () => {
  const { topArtists, setTopArtists } = useContext(TopArtistsContext);
  const { topTracks, setTopTracks } = useContext(TopTracksContext);

  // const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    axiosWithAuth()
      .get("/me/top/artists?limit=5&offset=0&time_range=long_term")
      .then((res) => {
        setTopArtists(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosWithAuth()
      .get("/me/top/tracks?limit=5&offset=0&time_range=long_term")
      .then((res) => {
        setTopTracks(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
    //eslint-disable-next-line
  }, []);

  return topTracks && topArtists ? <Dashboard /> : <Loading />;
};

export default Landing;
