import React, { useState, useEffect } from "react";
import "../Styles/Loading.css";
const Loading = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className="ball-container">
      <div className="ball-wrapper">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
      <button onClick={refreshPage} className="stuck">
        Impatient?
      </button>
    </div>
  );
};

export default Loading;
