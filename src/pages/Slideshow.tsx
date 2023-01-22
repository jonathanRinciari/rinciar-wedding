import * as React from "react"
import AWS from 'aws-sdk';
import { Zoom } from "react-slideshow-image";
import { Polarid } from "./components/polarid";

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 750,
  infinite: true,
  indicators: false,
  scale: .2,
  arrows: false
};

AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:32fd3a34-7ae2-41a2-bdd8-377dcc184d73',
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: 'rinciari-wedding-photos-s3uploadbucket-1emg7ito5fhsn'}
});

const useS3Images = () => {
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    const listObjects = async () => {
      const objects = await s3.listObjects().promise();
      const filteredImages = objects?.Contents?.reduce((fetchedImages: string[], {Key}) => {
          if (Key?.includes('jpg' || Key.includes('jpeg')) || Key?.includes('png')) {
            return [
              ...fetchedImages,
              `https://rinciari-wedding-photos-s3uploadbucket-1emg7ito5fhsn.s3.us-west-2.amazonaws.com/${Key}`
            ]
          }
          return fetchedImages;
      }, [])
      setImages(filteredImages ?? []);
    }

    listObjects()
      .catch(console.error);
  }, []);

  return images;
}

export const Slideshow = ({images}: {images: string[]}) => {
  return (
    <Zoom {...zoomOutProperties}>
    {images.map((src, index) => (
        <Polarid>
        <img key={index} src={src} />
        </Polarid>
    ))}
    </Zoom>
  );
};

export const SlideShowPage = () => {
    const images = useS3Images();

    if (!images.length) {
      return <div>loading...</div>
    }

    return <Slideshow images={images}/>
}
