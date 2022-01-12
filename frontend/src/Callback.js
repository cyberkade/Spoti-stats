import React from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
const Callback = ({ setLoggedIn }) => {
  let [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  useAuth(code);
  return <></>;
};

export default Callback;
