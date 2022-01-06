import React, { useState, useEffect } from "react";
import "../Styles/Loading.css";
const Loading = () => {
  return (
    <>
      <div className="ball-container">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
      <button>Impatient?</button>
    </>
  );
};

export default Loading;
