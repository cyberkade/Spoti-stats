import React, { useState, useEffect } from "react";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import axiosWithAuth from "../Utils/axiosWithAuth";

const { Header } = Layout;

const Navbar = ({ accessToken, focus, logout }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      axiosWithAuth()
        .get("/me")
        .then((res) => {
          if (res.data.images.length > 0 && res.data.display_name) {
            setUser({
              display_name: res.data.display_name,
              url: res.data.images[0].url,
            });
          } else {
            setUser({
              display_name: res.data.display_name,
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0mpEAFXv-iIa50q5rA2L6nnHGy_akXDFyQQ&usqp=CAU",
            });
          }
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
            <div className="nav-wrapper">
              <div className="logo" onClick={() => navigate("/dashboard")}>
                Spotistats
              </div>
              {focus === "dash" ? (
                <Link className="player-link" to="/player">
                  Music Player
                </Link>
              ) : (
                <Link className="player-link" to="/dashboard">
                  Dashboard
                </Link>
              )}
              <div className="user-info">
                <p className="username">{user.display_name}</p>
                <div className="profile-pic">
                  <Avatar size={50} icon={<UserOutlined />} src={user.url} />
                </div>
                <button onClick={() => logout()} className="logout">
                  Logout
                </button>
              </div>
            </div>
          </Header>
        </Layout>
      )}
    </>
  );
};

export default Navbar;
