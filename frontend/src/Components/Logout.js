import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    if (!accessToken) {
      setLoggedIn(false);
      navigate("/");
    }
  }, []);

  return <div></div>;
};

export default Logout;
