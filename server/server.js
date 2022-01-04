const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.CLIENT_ID || "a4d359510d674b32af2ac4ff821e067d",
    clientSecret:
      process.env.CLIENT_SECRET || "21fa2d7d75e6476baeea0e891c0fec2c",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.CLIENT_ID || "a4d359510d674b32af2ac4ff821e067d",
    clientSecret:
      process.env.CLIENT_SECRET || "21fa2d7d75e6476baeea0e891c0fec2c",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.listen(3001);
