import { Fade } from "react-slideshow-image";
import { Polaroid } from "./Polaroid";
import "react-slideshow-image/dist/styles.css";
import {Signature} from "./Signature";

const zoomOutProperties = {
    duration: 10000,
    transitionDuration: 1250,
    infinite: true,
    indicators: false,
    scale: .4,
    arrows: false
};

export const Slideshow = ({images}: {images: string[]}) => {
    return (
        <>
            <Fade {...zoomOutProperties}>
                {images.map((src, key) => (
                    <Polaroid key={key}>
                        <img className="slideShowImage" alt="" src={src} loading="eager" />
                    </Polaroid>
                ))}
            </Fade>
            <Signature />
        </>
    );
};
