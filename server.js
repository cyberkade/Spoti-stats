const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");

const server = express();
server.use(express.json());
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
let redirectURI;

if (process.env.NODE_ENV === "production") {
  // "heroku-postbuild": "cd frontend && npm install && npm run build"
  // server.use(express.static(path.resolve(__dirname, "./frontend/build")));
  // server.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "./frontend/public", "index.html"));
  // });
  redirectURI = "https://my-spotistats.netlify.app/";
}
if (process.env.NODE_ENV === "development") {
  redirectURI = "http://localhost:3000/";
}
server.get("/", (req, res) => {
  res.status(200).json({ message: "server up" });
});

server.post("/login", (req, res, next) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectURI,
    clientId: process.env.CLIENT_ID || "Spotify client_Id here",
    clientSecret: process.env.CLIENT_SECRET || "shh it's secret",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        access_token: data.body.access_token,
        refresh_token: data.body.refresh_token,
        expires_in: data.body.expires_in,
      });
    })
    .catch((err) => {
      next(err);
    });
});

server.post("/refresh", (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectURI,
    clientId: process.env.CLIENT_ID || "Spotistats client_Id here",
    clientSecret: process.env.CLIENT_SECRET || "shh it's secret",
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("Refresh!", data.body.access_token);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      next(err);
    });
});

server.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "No Lyrics Found";
  res.json({ lyrics });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
