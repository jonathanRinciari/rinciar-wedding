import { Fade } from "react-slideshow-image";
import { Polaroid } from "./polaroid";
import "react-slideshow-image/dist/styles.css";

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 1250,
  infinite: true,
  indicators: false,
  scale: .4,
  arrows: false
};

export const Slideshow = ({images}: {images: string[]}) => {
  return (
    <Fade {...zoomOutProperties}>
    {images.map((src, key) => (
        <Polarid key={key}>
          <img className="slideShowImage" alt="" src={src} loading="eager" />
        </Polarid>
    ))}
    </Fade>
  );
};
