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
            <div className="navWrapper">
              <div className="logo" onClick={() => navigate("/dashboard")}>
                Spotistats
              </div>
              <Link className="player-link username" to="/player">
                Music Player
              </Link>
              <div className="userInfo-and-profilePic">
                <p className="username">{user.display_name}</p>
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
