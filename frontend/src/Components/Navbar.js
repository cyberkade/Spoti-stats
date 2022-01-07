import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../Styles/Navbar.css";

const { Header } = Layout;

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Layout className="layout">
        <Header className="header">
          <div className="logoDiv">
            <div>
              {/* <img
                src={logo}
                alt="underdog devs logo"
                height="68"
                style={{ marginLeft: "1vw" }}
              /> */}
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
    </>
  );
};

export default Navbar;
