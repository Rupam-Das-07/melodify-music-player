import { RiPlayFill } from "react-icons/ri";
import "./FeaturedCard.css";

const FeaturedCard = ({ featured }) => {
  return (
    <div className="featured-card">
      <div className="featured-content">
        <div className="featured-text">
          <span className="featured-label">CURATED PLAYLIST</span>
          <h2 className="featured-title">{featured.title}</h2>
          <p className="featured-description">{featured.description}</p>
          <div className="featured-stats">
            <span className="listeners">
              {featured.listeners.toLocaleString()} likes
            </span>
            <span className="dot">•</span>
            <span className="songs">
              {featured.songs} Songs, {featured.duration}
            </span>
          </div>
        </div>
        <button className="play-button">
          <RiPlayFill />
        </button>
      </div>
      <div className="featured-image">
        <img src={featured.coverArt} alt={featured.title} />
      </div>
    </div>
  );
};

export default FeaturedCard;
