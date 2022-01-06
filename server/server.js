const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const server = express();
server.use(express.json());
server.use(cors());

server.post("/refresh", (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/callback",
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

server.post("/login", (req, res, next) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/callback",
    clientId: process.env.CLIENT_ID || "Spotistats client_Id here",
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

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
