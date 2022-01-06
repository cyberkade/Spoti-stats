import React, { useState, useEffect } from "react";
import "../Styles/Loading.css";
const Loading = () => {
  const [stuck, setStuck] = useState(false);
  setTimeout(() => {
    setStuck(true);
  }, 5000);
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
      {stuck && (
        <button onClick={refreshPage} class="stuck">
          Impatient?
        </button>
      )}
    </div>
  );
};

export default Loading;
