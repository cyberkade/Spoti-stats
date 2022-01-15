import React, { useContext, useState, useEffect } from "react";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopTracksContext } from "../Contexts/TopTracksContext";

import Carousel from "./Carousel";

const Dashboard = () => {
  const { topArtists } = useContext(TopArtistsContext);
  const { topTracks } = useContext(TopTracksContext);
  // eslint-disable-next-line
  // const [isLoggedIn, setLoggedIn] = useState();

  // useEffect(() => {
  //   setLoggedIn(true);
  // }, []);

  return (
    <>
      <section className="carousel-section">
        <Carousel top5={topArtists} />
        <Carousel top5={topTracks} />
      </section>
    </>
  );
};

export default Dashboard;
