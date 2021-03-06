import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Artist from "./Artist";
// import Track from "./Track";

function Carousel({ top5 }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const length = top5.length;

  const next = () => {
    return setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prev = () => {
    return setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const autoScroll = setTimeout(() => {
      next();
    }, 5000);
    return () => clearTimeout(autoScroll);
    // eslint-disable-next-line
  }, [current]);

  return (
    <div className="carousel-container">
      {top5[0].album ? (
        <p className="top-text">Top Tracks</p>
      ) : (
        <p className="top-text">Top Artists</p>
      )}
      <div className="carousel-image-container">
        {top5 &&
          top5.map((element, index) => {
            return (
              <div
                key={index}
                className={index === current ? "slide active" : "slide"}
              >
                {index === current && (
                  <div
                    style={{
                      background: ` center / contain no-repeat url(${
                        top5[0].album
                          ? element.album.images[1].url
                          : element.images[1].url
                      }) `,
                      position: "relative",
                      top: "30px",
                    }}
                    className="top-image-c"
                    alt="top 50 artist"
                  >
                    <span className="top-num-display-c dark">{index + 1}</span>
                    <div className="btn-cont">
                      <button className="scroll left" onClick={prev}>
                        &lt;
                      </button>
                      <button className="scroll right" onClick={next}>
                        &gt;
                      </button>
                    </div>
                    <p className="top-text-display-c dark">{element.name}</p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <div className="btn-cont-mobile">
        <button className="scroll mobile" onClick={prev}>
          &lt;
        </button>
        <button className="scroll mobile" onClick={next}>
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
