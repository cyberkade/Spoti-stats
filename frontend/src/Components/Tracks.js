import React, { useState, useContext, useEffect } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";
import Loading from "../Common/Loading";
import Track from "./Track";
import { TopTracksContext } from "../Contexts/TopTracksContext";

import { Breadcrumb } from "antd";
import {
  HomeOutlined,
  ControlOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form } from "react-bootstrap";

const Tracks = () => {
  const { topTracks, setTopTracks } = useContext(TopTracksContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setFetching] = useState(false);
  const [statFeedback, setStatFeedback] = useState("All Time");

  useEffect(() => {
    getAllTimeTracks();
    //eslint-disable-next-line
  }, []);

  const getStats = (range, feedback) => {
    setFetching(true);
    axiosWithAuth()
      .get(`/me/top/tracks?limit=50&offset=0&time_range=${range}`)
      .then((res1) => {
        const top50 = res1.data.items.map((artist, index) => {
          artist.top = index + 1;
          return artist;
        });
        axiosWithAuth()
          .get(`/me/top/tracks?limit=50&offset=49&time_range=${range}`)
          .then((res) => {
            res.data.items.shift();
            const next49 = res.data.items.map((artist, index) => {
              artist.top = index + 51;
              return artist;
            });
            setTopTracks([...top50, ...next49]);
            setFetching(false);
            setStatFeedback(feedback);
          })
          .catch((err) => {
            setFetching(false);
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllTimeTracks = async () => {
    getStats("long_term", "All Time");
  };

  const getRecentTracks = async () => {
    getStats("short_term", "Recent");
  };

  const getFilteredSearch = () => {
    const filteredSearch = topTracks.filter((track) => {
      const artistsSearch = track.artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return (
        track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artistsSearch.length > 0
      );
    });
    return filteredSearch;
  };

  const handleSwitch = () => {
    if (statFeedback === "All Time") {
      getRecentTracks();
    }
    if (statFeedback === "Recent") {
      getAllTimeTracks();
    }
  };

  return (
    <>
      <div className="toolbar">
        <div className="breadcrumbs">
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">
              <HomeOutlined />
              <span className="bc">Dashboard</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <UserOutlined />
              <span className="bc-active">Tracks</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Form.Control
          type="search"
          placeholder="Search Top Tracks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          onClick={() => {
            handleSwitch();
          }}
          className="top-switch"
        >
          <span className="feedback wiggle">{statFeedback}</span>
          {!isFetching && (
            <ControlOutlined
              className="wiggle"
              spin={isFetching}
              style={{ marginLeft: "8px" }}
            />
          )}
          {isFetching && <LoadingOutlined />}
        </div>
      </div>
      <div className="top-display">
        {topTracks && topTracks.length > 5 ? (
          getFilteredSearch().map((track, index) => (
            <Track key={index} track={track} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Tracks;
