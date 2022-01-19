import React, { useState, useEffect, useContext } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import axios from "axios";
import { TopTracksContext } from "../Contexts/TopTracksContext";
import { Breadcrumb } from "antd";
import { HomeOutlined, SoundOutlined } from "@ant-design/icons";

import Player from "./Player";
const spotifyApi = new SpotifyWebApi({
  client_id: "a4d359510d674b32af2ac4ff821e067d",
});

let server;
if (process.env.NODE_ENV === "production") {
  server = "https://my-spotistats.herokuapp.com/";
} else {
  server = "http://localhost:3001/";
}

function PlayerPage() {
  const { topTracks, setTopTracks } = useContext(TopTracksContext);
  const accessToken = localStorage.getItem("access_token");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState([]);
  const [lyrics, setLyrics] = useState("");

  const chooseTrack = (track) => {
    console.log(track.artists);
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  useEffect(() => {
    if (!playingTrack) {
      return;
    } else console.log(playingTrack.artists);
    axios
      .get(`${server}lyrics`, {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artists,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      })
      .catch((err) => console.log(err));
  }, [playingTrack]);

  useEffect(() => {
    setTopTracks(topTracks);
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            }
            // track.album.images[0]
          );
          return {
            artists: track.artists.map((artist) => artist.name),
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => cancel === true;
  }, [search, accessToken]);

  return (
    <div className="container player-wrapper">
      <div className="toolbar">
        <div className="breadcrumbs">
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">
              <HomeOutlined />
              <span className="bc">Dashboard</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <SoundOutlined />
              <span className="bc-active">Player</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "75%" }}
        />
      </div>
      <div className="player-display">
        {searchResults.map((track) => (
          <div className="search-results">
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          </div>
        ))}
        {searchResults.length === 0 && (
          <div className="lyrics" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </div>
  );
}

export default PlayerPage;
