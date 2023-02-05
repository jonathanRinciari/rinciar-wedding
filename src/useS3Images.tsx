import { useEffect, useState } from 'react';

import AWS from 'aws-sdk';

AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:32fd3a34-7ae2-41a2-bdd8-377dcc184d73',
});

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'rinciari-wedding-photos-s3uploadbucket-1emg7ito5fhsn'}
});

export const useS3Images = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const listObjects = async () => {
            const objects = await s3.listObjects().promise();
            const filteredImages = objects?.Contents?.map(({Key}: any) => {
                return `https://rinciari-wedding-photos-s3uploadbucket-1emg7ito5fhsn.s3.us-west-2.amazonaws.com/${Key}`
            })
            setImages(filteredImages ?? []);
        }

        listObjects()
            .catch(console.error);
    }, []);

    return images;
}