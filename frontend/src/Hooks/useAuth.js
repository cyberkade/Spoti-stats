import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const navigate = useNavigate();
  let server;
  if (process.env.NODE_ENV === "production") {
    server = "https://my-spotistats.herokuapp.com";
  } else {
    server = "http://localhost:3001";
  }

  useEffect(() => {
    console.log(code);
    axios
      .post(`${server}/login`, {
        code,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res.data.access_token);
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        setExpiresIn(res.data.expires_in);
        navigate("/dashboard");
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${server}/refresh`, {
          refreshToken,
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          setAccessToken(res.data.access_token);
          setExpiresIn(res.data.expires_in);
        })
        .catch((err) => {
          navigate("/");
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  return accessToken;
};
export default useAuth;
