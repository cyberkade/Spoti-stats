import { useContext, useState, useEffect } from "react";
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

  const getStats = (range, feedback) => {
    setFetching(true);
    axiosWithAuth()
      .get(`/me/top/artists?limit=50&offset=0&time_range=${range}`)
      .then((res1) => {
        const top50 = res1.data.items.map((artist, index) => {
          artist.top = index + 1;
          return artist;
        });
        axiosWithAuth()
          .get(`/me/top/artists?limit=50&offset=49&time_range=${range}`)
          .then((res) => {
            res.data.items.shift();
            const next49 = res.data.items.map((artist, index) => {
              artist.top = index + 51;
              return artist;
            });
            setTopArtists([...top50, ...next49]);
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

  const getAllTimeArtists = async () => {
    getStats("long_term", "All Time");
  };

  const getRecentArtists = async () => {
    getStats("short_term", "Recent");
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
    if (statFeedback === "Recent") {
      getAllTimeArtists();
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
            <Artist key={index} artist={artist} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default Artists;
