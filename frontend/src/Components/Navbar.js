import React, { useState, useEffect } from "react";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import axiosWithAuth from "../Utils/axiosWithAuth";

const { Header } = Layout;

const Navbar = ({ accessToken }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      axiosWithAuth()
        .get("/me")
        .then((res) => {
          setUser({
            display_name: res.data.display_name,
            url: res.data.images[0].url,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [accessToken]);
  return (
    <>
      {user && (
        <Layout className="layout">
          <Header className="header">
            <div className="navWrapper">
              <div className="logo" onClick={() => navigate("/dashboard")}>
                Spotistats
              </div>
              <Link className="player-link" to="/player">
                Music Player
              </Link>
              <div className="userInfo-and-profilePic">
                <div className="userInfo">
                  <div className="username"> {user.display_name} </div>
                </div>
                <div className="profilePic">
                  <Avatar size={50} icon={<UserOutlined />} src={user.url} />
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
