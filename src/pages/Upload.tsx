import { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Promise from 'bluebird';
import {Signature} from "../components/Signature";



const FileInput = ({ value, onChange, ...rest }: any) => (
    <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={e => {
            // @ts-ignore
            onChange([...e.target.files]);
        }}
    />
);

interface FormImages {
    file: File;
    image: string;
}

interface FormProps {
    loading: boolean;
    value: FormImages[];
    setValue: (e: FormImages[]) => void;
    uploadPhotos: () => void;
}

const Form = ({loading, value, setValue, uploadPhotos}: FormProps) => {
    const MAX_IMAGE_SIZE = 100000000;

    const onFileChange = async (files: File[]) => {
        const images = await Promise.all(files.map(async (file: File) => {
            return {
                file,
                image: await createImage(file)
            }
        }));
        setValue(images);
    }

    const createImage = async (file: File): Promise<string> => {

        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.onload = (e) => {

                if (typeof e?.target?.result === 'string' && e?.target.result.length > MAX_IMAGE_SIZE) {
                    reject('Image is loo large.');
                }

                resolve(e?.target?.result as string);
            };
            reader.readAsDataURL(file)
        });
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant='h2' gutterBottom textAlign='center'>
                    Select and upload photo(s)
                </Typography>
                <Typography variant="body2" textAlign='center'>
                    Please upload up to 50 photos at a time. Feel free to choose from memories with Emine + Jon,
                    moments from the wedding day or anything that reminds you of the couple.
                    All of these photos will be displayed at the wedding.
                </Typography>
            </CardContent>
            {
                loading ? (
                    <Box sx={{margin: '1rem 0', padding: '0 1rem'}}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Button variant="contained" component="label">
                            Select photo(s)
                            <FileInput value={value.map((val) => val.file)} onChange={onFileChange} />
                        </Button>
                        <Button  disabled={!value.length} variant="contained" component="label" onClick={uploadPhotos}>
                            Upload
                        </Button>
                    </CardActions>
                )
            }
        </Card>
    );
}


export const UploadPage = () => {
    const [isLoading, setLoading] = useState(false);
    const API_ENDPOINT = 'https://4p2tzk6nq7.execute-api.us-west-2.amazonaws.com/uploads';
    const [images, setImages] = useState<FormImages[]>([]);
    const [open, setOpen] = useState(false);


    const uploadImage = async () => {
        setLoading(true);
        // Get the presigned URL

        await Promise.map(images, async ({image, file}: any) => {
            await Promise.delay(750);
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify({
                    fileType: file.type.toLowerCase(),
                    extension: file.name.split('.')[1].toLowerCase()
                })
            });

            const parsedResponse = await response.json();

            let binary = atob(image.split(',')[1]);
            let array: any = [];

            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }

            let blobData = new Blob([new Uint8Array(array)], {type: file.type.toLowerCase()})
            console.log('Uploading to: ', parsedResponse.uploadURL, blobData);
            const result = await fetch(parsedResponse.uploadURL, {
                method: 'PUT',
                body: blobData
            });

            console.log('Result: ', result);
        }, {concurrency: 1});

        setLoading(false);
        setImages([]);
        setOpen(true);
    }

    return (
        <Container maxWidth="sm">
            <Snackbar open={open} autoHideDuration={10000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Upload successful!
                </Alert>
            </Snackbar>
            <Box sx={{marginTop: '10rem'}}>
                <Form
                    uploadPhotos={uploadImage}
                    loading={isLoading}
                    value={images}
                    setValue={setImages}
                />
            </Box>
            <ImageList sx={{ width: '100%' }} cols={1}>
                {images.map(({image}, key) => (
                    <ImageListItem key={key}>
                        <div>
                            <div style={{position: 'absolute'}}>
                                <IconButton color="error" aria-label="remove picture" component="label" onClick={() => {
                                    setImages((prevImages) => {
                                        return prevImages.filter((curImage) => image !== curImage.image)
                                    })
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            <img
                                className='previewImage'
                                src={image}
                                alt=''
                                loading="lazy"
                            />
                        </div>
                    </ImageListItem>
                ))}
            </ImageList>
            <Signature marginTop={'4rem'}/>
        </Container>
    )
}