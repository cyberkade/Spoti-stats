import React, { useEffect, useContext, useState } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";
import Dashboard from "../Components/Dashboard.js";
import Loading from "../Common/Loading.js";
import { UserContext } from "../Contexts/UserContext";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopTracksContext } from "../Contexts/TopTracksContext";

const Landing = () => {
  const { user, setUser } = useContext(UserContext);
  const { topArtists, setTopArtists } = useContext(TopArtistsContext);
  const { topTracks, setTopTracks } = useContext(TopTracksContext);

  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    // axiosWithAuth()
    //   .get("/me")
    //   .then((res) => {
    //     setUser(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
  }, []);

  return topTracks && topArtists ? <Dashboard /> : <Loading />;
};

export default Landing;
