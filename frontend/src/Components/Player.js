import { useState, useEffect } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyWebPlayer
      initialVolume={0.5}
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: "#dca387",
        bgColor: "#151515",
        color: "#fff",
        // loaderColor: "#fff",
        sliderColor: "#1cb954",
        trackArtistColor: "#666",
        trackNameColor: "#fff",
      }}
      // styles={{ sliderColor: "#CCCCCC", sliderTrackColor: "#333333" }}
    />
  );
};

export default Player;
