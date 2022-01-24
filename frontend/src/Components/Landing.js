import React, { useEffect, useContext } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";
import Dashboard from "../Components/Dashboard.js";
import Loading from "../Common/Loading.js";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopTracksContext } from "../Contexts/TopTracksContext";
import { useNavigate } from "react-router-dom";

const Landing = ({ setFocus }) => {
  const { topArtists, setTopArtists } = useContext(TopArtistsContext);
  const { topTracks, setTopTracks } = useContext(TopTracksContext);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else
      axiosWithAuth()
        .get("/me/top/artists?limit=5&offset=0&time_range=long_term")
        .then((res) => {
          if (res.data.items.length === 0) {
            setTopArtists({
              noStats: "We couldn't access your top artists, keep jammin'!",
            });
          } else {
            setTopArtists(res.data.items);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    axiosWithAuth()
      .get("/me/top/tracks?limit=5&offset=0&time_range=long_term")
      .then((res) => {
        if (res.data.items.length === 0) {
          setTopTracks({
            noStats: "We couldn't access your top tracks, keep jammin'!",
          });
        } else {
          setTopTracks(res.data.items);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //eslint-disable-next-line
  }, []);

  return topTracks && topArtists ? (
    <Dashboard setFocus={setFocus} />
  ) : (
    <Loading />
  );
};

export default Landing;
