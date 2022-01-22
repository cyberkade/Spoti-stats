import { useState } from "react";

import { TopArtistsContext } from "./Contexts/TopArtistsContext";
import { TopTracksContext } from "./Contexts/TopTracksContext";

import Logout from "./Components/Logout";
import Login from "./Components/Login";
import Landing from "./Components/Landing";
import Artists from "./Components/Artists";
import Tracks from "./Components/Tracks";
import Navbar from "./Components/Navbar";
import PlayerPage from "./Components/PlayerPage";

import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
const App = () => {
  //eslint-disable-next-line
  const [isLoggedIn, setLoggedIn] = useState();
  const [focus, setFocus] = useState("dash");
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const navigate = useNavigate();
  let accessToken;
  accessToken = localStorage.getItem("access_token");

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/logout");
  };

  return (
    <>
      {accessToken && (
        <Navbar accessToken={accessToken} focus={focus} logout={logout} />
      )}
      <TopArtistsContext.Provider value={{ topArtists, setTopArtists }}>
        <TopTracksContext.Provider value={{ topTracks, setTopTracks }}>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/" element={<PrivateOutlet />}>
              <Route
                path="/logout"
                element={<Logout setLoggedIn={setLoggedIn} />}
              />
              <Route
                path="/dashboard"
                element={<Landing setFocus={setFocus} />}
              />
              <Route path="/artists" element={<Artists />} />
              <Route path="/tracks" element={<Tracks />} />
              <Route
                path="/player"
                element={<PlayerPage setFocus={setFocus} />}
              />
            </Route>
          </Routes>
        </TopTracksContext.Provider>
      </TopArtistsContext.Provider>
    </>
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
