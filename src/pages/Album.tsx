import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { CircularProgress } from '@mui/material';
import { useS3Images } from '../useS3Images';

export const Album = () => {
    const images = useS3Images();

    if (!images.length) {
        return <CircularProgress />
    }

    return (
    <ImageList sx={{ width: '100vw', height: '100vh' }} >
        {images.map((image, key) => (
            <ImageListItem key={key}>   
                    <img alt="" src={image} loading="lazy" />
            </ImageListItem>
        ))}
    </ImageList>
    )
}