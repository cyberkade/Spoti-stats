import React, { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import axiosWithAuth from "../Utils/axiosWithAuth";
import Dashboard from "../Components/Dashboard.js";
import Loading from "../Common/Loading.js";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopTracksContext } from "../Contexts/TopTracksContext";

const Callback = () => {
  const { topArtists, setTopArtists } = useContext(TopArtistsContext);
  const { topTracks, setTopTracks } = useContext(TopTracksContext);
  let [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);
  const accessToken = useAuth(code);
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
  }, []);

  return topTracks && topArtists && accessToken ? <Dashboard /> : <Loading />;
};

export default Callback;
