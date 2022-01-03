import React from "react";

const AUTH_URL =
  "http://localhost:3000/authorize?client_id=&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  return <button>Login to Spotify!</button>;
};

export default Login;
