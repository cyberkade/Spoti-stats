import React, { useState } from "react";
import { UserContext } from "./Contexts/UserContext";
import { TopArtistsContext } from "./Contexts/TopArtistsContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Landing from "./Components/Landing";
import Callback from "./Callback";
import Loading from "./Common/Loading";
import { Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const App = () => {
  const [user, setUser] = useState();
  const [topArtists, setTopArtists] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TopArtistsContext.Provider value={{ topArtists, setTopArtists }}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="/loading" element={<Loading />} />
            <Route path="/dashboard" element={<Landing />} />
          </Route>
        </Routes>
      </TopArtistsContext.Provider>
    </UserContext.Provider>
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
