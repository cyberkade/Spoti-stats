import React, { useEffect, useContext, useState } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";
import Dashboard from "../Components/Dashboard.js";
import Loading from "../Common/Loading.js";
import { UserContext } from "../Contexts/UserContext";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopTracksContext } from "../Contexts/TopTracksContext";

const Landing = () => {
  const { user, setUser } = useContext(UserContext);
  const { setTopArtists } = useContext(TopArtistsContext);
  const { setTopTracks } = useContext(TopTracksContext);

  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    axiosWithAuth()
      .get("/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axiosWithAuth()
      .get("/me/top/artists?limit=50&offset=0&time_range=long_term")
      .then((res) => {
        console.log(res.data);
        setTopArtists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axiosWithAuth()
      .get("/me/top/tracks?limit=50&offset=0&time_range=long_term")
      .then((res) => {
        setTopTracks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return user ? <Dashboard /> : <Loading />;
};

export default Landing;
