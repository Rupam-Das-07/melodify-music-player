import { RiVerifiedBadgeFill } from "react-icons/ri";
import "./ArtistHeader.css";

const ArtistHeader = ({ artist }) => {
  return (
    <div className="artist-header">
      <div
        className="artist-banner"
        style={{ backgroundImage: `url(${artist.bannerUrl})` }}
      >
        <div className="banner-content">
          <div className="artist-info">
            <div className="verified-badge">
              <RiVerifiedBadgeFill /> Verified Artist
            </div>
            <h1>{artist.name}</h1>
            <p className="monthly-listeners">
              {artist.monthlyListeners.toLocaleString()} monthly listeners
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;
