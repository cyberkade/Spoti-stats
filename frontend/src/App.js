import React, { useState, useContext, useEffect } from "react";

import { UserContext } from "./Contexts/UserContext";
import { TopArtistsContext } from "./Contexts/TopArtistsContext";
import { TopTracksContext } from "./Contexts/TopTracksContext";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Components/Login";
import Landing from "./Components/Landing";
import Callback from "./Callback";
import Loading from "./Common/Loading";
import Artists from "./Components/Artists";
import Tracks from "./Components/Tracks";
import Navbar from "./Components/Navbar";
import PlayerPage from "./Components/PlayerPage";
import axiosWithAuth from "./Utils/axiosWithAuth";

import { Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const initialUser = {
  display_name: "",
  images: [{ url: "" }, { url: "" }, { url: "" }],
};

const App = () => {
  const [user, setUser] = useState(initialUser);
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      setLoggedIn(true);
    } else {
      console.log("no");
    }
    if (isLoggedIn && !user) {
      axiosWithAuth()
        .get("/me")
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  // console.log(user || "boo");
  return (
    // <UserContext.Provider value={{ user, setUser }}>
    <>
      {user && <Navbar user={user} />}
      <TopArtistsContext.Provider value={{ topArtists, setTopArtists }}>
        <TopTracksContext.Provider value={{ topTracks, setTopTracks }}>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/" element={<PrivateOutlet />}>
              <Route path="/loading" element={<Loading />} />
              <Route path="/dashboard" element={<Landing />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/tracks" element={<Tracks />} />
              <Route path="/player" element={<PlayerPage />} />
            </Route>
          </Routes>
        </TopTracksContext.Provider>
      </TopArtistsContext.Provider>
    </>
    // </UserContext.Provider>
  );
};

const PrivateOutlet = () => {
  return localStorage.getItem("access_token") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default App;
