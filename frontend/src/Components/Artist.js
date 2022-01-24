import useWindowDimensions from "../Hooks/useWindowDimensions";

function Artist({ artist }) {
  const { height, width } = useWindowDimensions();
  return (
    <div>
      <div className="top-image shadow" />
      <div
        style={{
          background: ` center / cover no-repeat url(${
            artist && width <= 1500
              ? artist.images[1].url
              : artist.images[0].url
          })`,
        }}
        className="top-image"
        alt="top 50 artist"
      >
        <span className="top-num-display dark">{artist.top}</span>
        <p className="top-text-display dark">{artist.name}</p>
      </div>
    </div>
  );
}

export default Artist;
