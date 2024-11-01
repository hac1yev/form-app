import { Box, Button, Input, styled } from '@mui/material';
import PropTypes from 'prop-types';

const InputFile = styled(Input)(() => ({
    display: 'none',
}));

const Label = styled('label')(({ theme }) => ({
    display: 'inline-block',
    marginTop: theme.spacing(1),
    cursor: 'pointer',
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const AddImageToPost = ({ setImages, images }) => {

    const onChange = (event) => {
        if (event.target.files.length > 0) {
            const fileArray = Array.from(event.target.files); // Store actual files
            setImages(fileArray); // Pass the File objects to `setImages`
        }
    };

    return (
        <>
            <InputFile
                id="upload-file"
                type="file"
                onChange={onChange}
                inputProps={{ accept: "image/png, image/gif, image/jpeg", multiple: true }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Label htmlFor="upload-file">
                    <Button component="span">Şəkil və ya şəkilləri yüklə</Button>
                </Label>
                {images && images.length > 0 && (
                    <Box>
                        {images.map((img, index) => (
                            <span key={index}>{img.name}{index < images.length - 1 ? ', ' : ''}</span>
                        ))}
                    </Box>
                )}
            </Box>
        </>
    );
}

AddImageToPost.propTypes = {
    setImages: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired, // `images` should be an array of `File` objects
};

export default AddImageToPost;
