import { useSearchParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Common/Loading";

const Login = () => {
  let [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  useAuth(code);
  let redirectURI;
  if (process.env.NODE_ENV === "production") {
    redirectURI = "https://my-spotistats.netlify.app/";
  } else {
    redirectURI = "http://localhost:3000/";
  }
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a4d359510d674b32af2ac4ff821e067d&response_type=code&redirect_uri=${redirectURI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20user-top-read`;
  return (
    <>
      {!code ? (
        <div className=" container" style={{ margin: "0px 10px" }}>
          <h1 className="title">Spoti-Stats</h1>
          <p className="text">
            Track your stats <br />
            Listen to music <span className="italic">with lyrics</span>
          </p>
          <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login With Spotify!
          </a>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Login;
