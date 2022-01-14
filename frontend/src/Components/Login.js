import { useSearchParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  let redirectURI;
  let [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);
  useAuth(code);
  if (process.env.NODE_ENV === "production") {
    redirectURI = "https://kades-spotistats.netlify.app/";
  } else {
    redirectURI = "http://localhost:3000/";
  }
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a4d359510d674b32af2ac4ff821e067d&response_type=code&redirect_uri=${redirectURI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20user-top-read`;
  return (
    <div className=" container" style={{ margin: "0px 10px" }}>
      <h1 className="title">Spoti-Stats</h1>
      <p className="text">Track your stats, create new playlists, and more!</p>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify!
      </a>
    </div>
  );
};

export default Login;
