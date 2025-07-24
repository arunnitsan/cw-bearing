import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../../utils/AOSRefresh";

const RoundedImage = ({ nameClass = "", image = "", imageAlt = "", aosAnimation = false }) => {
  const dataAos = aosAnimation ? "fade-right" : "fade-left";

  return (
    <div
      className={`${nameClass && nameClass} rounded-image-box`}
      data-aos={dataAos}
    >
      {aosAnimation ? (
        <span className="circle" data-aos="fade-left"></span>
      ) : (
        <span className="circle"></span>
      )}
      <span className="img-in">
        <LazyLoadImage src={image} afterLoad={AOSRefresh} alt={imageAlt} />
      </span>
    </div>
  );
};

export default RoundedImage;
