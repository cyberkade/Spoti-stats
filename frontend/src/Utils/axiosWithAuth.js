import axios from "axios";
const axiosWithAuth = () => {
  const accessToken = localStorage.getItem("access_token");
  return axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default axiosWithAuth;
