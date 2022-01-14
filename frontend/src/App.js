import { useState } from "react";

import { TopArtistsContext } from "./Contexts/TopArtistsContext";
import { TopTracksContext } from "./Contexts/TopTracksContext";

import Login from "./Components/Login";
import Landing from "./Components/Landing";
import Loading from "./Common/Loading";
import Artists from "./Components/Artists";
import Tracks from "./Components/Tracks";
import Navbar from "./Components/Navbar";
import PlayerPage from "./Components/PlayerPage";

import { Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const App = () => {
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const accessToken = localStorage.getItem("access_token");
  return (
    <>
      {accessToken && <Navbar />}
      <TopArtistsContext.Provider value={{ topArtists, setTopArtists }}>
        <TopTracksContext.Provider value={{ topTracks, setTopTracks }}>
          <Routes>
            <Route exact path="/" element={<Login />} />

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
