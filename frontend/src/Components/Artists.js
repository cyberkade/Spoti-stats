import React, { useContext, useState, useEffect } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth";
import Artist from "./Artist";
import Loading from "../Common/Loading";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";

import { Breadcrumb } from "antd";
import {
  HomeOutlined,
  ControlOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form } from "react-bootstrap";

function Artists() {
  const { topArtists, setTopArtists } = useContext(TopArtistsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setFetching] = useState(false);
  const [statFeedback, setStatFeedback] = useState("All Time");

  useEffect(() => {
    getAllTimeArtists();
    // eslint-disable-next-line
  }, []);

  const getAllTimeArtists = async () => {
    setFetching(true);
    axiosWithAuth()
      .get("/me/top/artists?limit=50&offset=0&time_range=long_term")
      .then((res1) => {
        const top50 = res1.data.items;
        axiosWithAuth()
          .get("/me/top/artists?limit=50&offset=49&time_range=long_term")
          .then((res) => {
            res.data.items.shift();
            setTopArtists([...top50, ...res.data.items]);
            setFetching(false);
            setStatFeedback("All Time");
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

  const getRecentArtists = async () => {
    setFetching(true);
    const res1 = await axiosWithAuth().get(
      "/me/top/artists?limit=50&offset=0&time_range=short_term"
    );
    const top50 = res1.data.items;
    axiosWithAuth()
      .get("/me/top/artists?limit=50&offset=49&time_range=short_term")
      .then((res) => {
        res.data.items.shift();
        setTopArtists([...top50, ...res.data.items]);
        setFetching(false);
        setStatFeedback("Most Recent");
      })
      .catch((err) => {
        setFetching(false);
        console.log(err);
      });
  };

  const getFilteredSearch = () => {
    const filteredSearch = topArtists.filter((artist) => {
      return artist.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return filteredSearch;
  };

  const handleSwitch = () => {
    if (statFeedback === "All Time") {
      getRecentArtists();
    }
    if (statFeedback === "Most Recent") {
      getAllTimeArtists();
    }
  };

  return (
    <section className="view-top-container">
      <div className="toolbar">
        <div className="breadcrumbs">
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">
              <HomeOutlined />
              <span className="bc">Dashboard</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <UserOutlined />
              <span className="bc-active">Artists</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Form.Control
          type="search"
          placeholder="Search Top Artists"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          onClick={() => {
            handleSwitch();
          }}
          className="top-switch"
          style={{ marginRight: "20px" }}
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
        {topArtists && topArtists.length > 5 ? (
          getFilteredSearch().map((artist, index) => (
            <Artist key={index} artist={{ ...artist, top: index + 1 }} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}

export default Artists;
