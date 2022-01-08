import React, { useState } from "react";
import "../Styles/Carousel.css";
function Carousel({ top5 }) {
  const [current, setCurrent] = useState(0);
  const handleClick = () => {};
  console.log(top5[0].album || "");
  console.log(top5[0].images || "**");
  return (
    <>
      {top5[0].album && (
        <div className="carousel-container">
          <img
            src={top5[0].album.images[1].url}
            className="carousel-image"
            alt={top5.name}
          />
        </div>
      )}
      {top5[0].images && (
        <div className="carousel-container">
          <div
            style={{ backgroundImage: `url(${top5[0].images[1].url})` }}
            className="carousel-image"
            alt={top5.name}
          ></div>
        </div>
      )}
    </>
  );
}

export default Carousel;
