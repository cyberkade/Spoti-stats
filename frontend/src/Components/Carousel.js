import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Artist from "./Artist";
import Track from "./Track";
import "../Styles/Carousel.css";

function Carousel({ top5 }) {
  const navigate = useNavigate();
  const [intervalId, setIntervalId] = useState();
  const [current, setCurrent] = useState(0);
  const length = top5.length;

  const next = () => {
    console.log("NEXT", current);
    return setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prev = () => {
    return setCurrent(current === 0 ? length - 1 : current - 1);
  };
  console.log("RENDERED", current);
  console.log(top5[current]);

  // useEffect(() => {
  //   const autoScroll = setInterval(() => {
  //     next();
  //   }, 5000);
  //   return () => clearInterval(autoScroll);
  // }, []);
  // const autoScroll = setInterval(() => {
  //   next();
  // }, 5000);
  // setTimeout(() => {
  //   clearInterval(autoScroll);
  // }, 25000);
  return (
    <div className="carousel-container">
      {top5 &&
        top5.map((element, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && top5[0].album ? (
                <div
                  style={{
                    background: ` center / contain no-repeat url(${element.album.images[1].url}) `,
                  }}
                  className="trackImg"
                  alt="top 50 artist"
                >
                  <span className="top-num-display">{index + 1}</span>
                  <div className="btn-cont">
                    <button className="scroll left" onClick={prev}>
                      &lt;
                    </button>
                    <button className="scroll right" onClick={next}>
                      &gt;
                    </button>
                  </div>
                  <p className="top-text-display">{element.name}</p>
                </div>
              ) : (
                // <Track track={{ ...element, top: index + 1 }} />
                index === current && (
                  <div
                    style={{
                      background: ` center / cover no-repeat url(${element.images[1].url})`,
                    }}
                    className="artistImg"
                    alt="top 50 artist"
                  >
                    <span className="top-num-display">{index + 1}</span>
                    <div className="btn-cont">
                      <button className="scroll left" onClick={prev}>
                        &lt;
                      </button>
                      <button className="scroll right" onClick={next}>
                        &gt;
                      </button>
                    </div>
                    <p className="top-text-display">{element.name}</p>
                  </div>
                )
              )}
            </div>
          );
        })}

      {/* <div className="btn-cont">
        <button className="scroll left" onClick={prev}>
          &lt;
        </button>
        <button className="scroll right" onClick={next}>
          &gt;
        </button>
      </div> */}

      {top5[0].album ? (
        <>
          {/* <div className="empty" /> */}
          <button
            className="view"
            onClick={() => {
              navigate("/tracks");
            }}
          >
            View Tracks
          </button>
        </>
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
