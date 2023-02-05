import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Slideshow } from '../components/Slideshow';
import { useS3Images } from '../useS3Images';


export const SlideShowPage = () => {
    const images = useS3Images();

    if (!images.length) {
        return (
            <Box sx={{ display: 'flex', height: '500px', width: '25vw', margin: 'auto', flexDirection: 'column', justifyContent: 'center' }}>
                <LinearProgress />
            </Box>
        );
    }

    return <Slideshow images={images}/>
}