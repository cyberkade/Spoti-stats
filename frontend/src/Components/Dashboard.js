import React, { useContext, useEffect } from "react";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopTracksContext } from "../Contexts/TopTracksContext";

import Carousel from "./Carousel";

const Dashboard = ({ setFocus }) => {
  const { topArtists } = useContext(TopArtistsContext);
  const { topTracks } = useContext(TopTracksContext);
  useEffect(() => {
    setFocus("dash");
  }, []);
  console.log(topArtists);
  return (
    <>
      <section className="carousel-section">
        {topArtists.noStats ? (
          <div className="noStats">{topArtists.noStats}</div>
        ) : (
          <Carousel key="artists" top5={topArtists} />
        )}
        {topTracks.noStats ? (
          <div className="noStats">{topTracks.noStats}</div>
        ) : (
          <Carousel key="tracks" top5={topTracks} />
        )}
      </section>
    </>
  );
};

export default Dashboard;
