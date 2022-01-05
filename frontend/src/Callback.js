import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
const Callback = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  console.log(code);
  useEffect(() => {
    checkCode(code);
  }, []);
  const accessToken = useAuth(code);
  const checkCode = (code) => {
    if (code) {
      console.log(accessToken);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  return <></>;
};

export default Callback;
