import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Artist from "./Artist";
import Track from "./Track";
import "../Styles/Carousel.css";

function Carousel({ top5 }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const length = top5.length;

  const next = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  console.log(top5[current]);
  // setInterval(() => {
  //   next();
  // }, 5000);
  return (
    <div className="carousel-container">
      {top5.map((element, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && top5[0].album ? (
              <Track track={{ ...element, top: index + 1 }} />
            ) : (
              index === current && (
                <Artist artist={{ ...element, top: index + 1 }} />
              )
            )}
          </div>
        );
      })}

      <div className="btn-cont">
        <button className="view carousel left" onClick={prev}>
          &lt;
        </button>
        <button className="view carousel right" onClick={next}>
          &gt;
        </button>
      </div>

      {top5[0].album ? (
        <button
          className="view"
          onClick={() => {
            navigate("/tracks");
          }}
        >
          View Tracks
        </button>
      ) : (
        <button
          className="view"
          onClick={() => {
            navigate("/artists");
          }}
        >
          View Artists
        </button>
      )}
    </div>
  );
}

export default Carousel;
