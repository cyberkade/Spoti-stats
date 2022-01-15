import React, { useState, useEffect } from "react";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import axiosWithAuth from "../Utils/axiosWithAuth";
import SpotifyWebApi from "spotify-web-api-node";

const { Header } = Layout;
const spotifyApi = new SpotifyWebApi({
  client_id: "a4d359510d674b32af2ac4ff821e067d",
});
const Navbar = ({ accessToken }) => {
  const [user, setUser] = useState();
  // const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      axiosWithAuth()
        .get("/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [accessToken]);
  console.log(user);
  return (
    <>
      {user && (
        <Layout className="layout">
          <Header className="header">
            <div className="logoDiv">
              <div className="logo" onClick={() => navigate("/dashboard")}>
                Spotistats
              </div>
              <div>
                <Link to="/player">Music Player</Link>
              </div>
              <div className="userInfo-and-profilePic">
                <div className="userInfo">
                  <div className="username"> {user.display_name} </div>
                </div>
                <div className="profilePic">
                  <Avatar
                    size={50}
                    icon={<UserOutlined />}
                    src={user.images[0].url}
                  />
                </div>
              </div>
            </div>
          </Header>
        </Layout>
      )}
    </>
  );
};

export default Navbar;
