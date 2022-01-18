import React, { useState, useContext, useEffect } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";
import Loading from "../Common/Loading";
import Track from "./Track";
import { TopTracksContext } from "../Contexts/TopTracksContext";

import { Breadcrumb } from "antd";
import { HomeOutlined, SlidersOutlined, UserOutlined } from "@ant-design/icons";
import { Form } from "react-bootstrap";

const Tracks = () => {
  const { topTracks, setTopTracks } = useContext(TopTracksContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setFetching] = useState(false);
  const [statFeedback, setStatFeedback] = useState("");

  useEffect(() => {
    axiosWithAuth()
      .get("/me/top/tracks?limit=50&offset=0&time_range=long_term")
      .then((res1) => {
        const top50 = res1.data.items;
        axiosWithAuth()
          .get("/me/top/tracks?limit=50&offset=49&time_range=long_term")
          .then((res) => {
            res.data.items.shift();
            setTopTracks([...top50, ...res.data.items]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    //eslint-disable-next-line
  }, []);

  const getRecentTracks = async () => {
    setFetching(true);
    const res1 = await axiosWithAuth().get(
      "/me/top/tracks?limit=50&offset=0&time_range=long_term"
    );
    const top50 = res1.data.items;
    axiosWithAuth()
      .get("/me/top/tracks?limit=50&offset=49&time_range=long_term")
      .then((res) => {
        res.data.items.shift();
        setTopTracks([...top50, ...res.data.items]);
        setFetching(false);
        setStatFeedback("Most Recent");
      })
      .catch((err) => {
        setFetching(false);
        console.log(err);
      });
  };

  console.log(topTracks[0]);
  const getFilteredSearch = () => {
    const filteredSearch = topTracks.filter((track) => {
      return track.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return filteredSearch;
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
          style={{ width: "50%", position: "relative", left: "-30px" }}
        />
        <div>
          <span className="feedback wiggle">{statFeedback}</span>
          <SlidersOutlined spin={isFetching} style={{ marginLeft: "8px" }} />
        </div>
      </div>
      <div className="tracks-container">
        {topTracks && topTracks.length > 5 ? (
          getFilteredSearch().map((track, index) => (
            <Track key={index} track={{ ...track, top: index + 1 }} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Tracks;
