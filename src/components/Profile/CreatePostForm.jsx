import { Grid, OutlinedInput, styled } from "@mui/material";
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const CreatePostForm = ({ postFormValue,setPostFormValue,setTextContent,setHeading }) => {

    const handlePostFormChange = (content, delta, source, editor) => {
        setPostFormValue(content);
        setTextContent(editor.getText());
    };

    return (
        <>
            <FormGrid item>
                <OutlinedInput
                    sx={{ borderRadius: '14px' }}
                    id="first-name"
                    name="first-name"
                    type="name"
                    placeholder={`Başlıq*`}
                    autoComplete="first name"
                    required
                    onChange={(e) => setHeading(e.target.value)}
                />
            </FormGrid>
            <ReactQuill
                theme="snow"
                style={{ height: '150px', margin: '20px 0' }}
                value={postFormValue}
                onChange={handlePostFormChange}
            />
        </>
    );
};

CreatePostForm.propTypes = {
    setPostFormValue: PropTypes.func.isRequired,
    setTextContent: PropTypes.func.isRequired,
    setHeading: PropTypes.func.isRequired,
    postFormValue: PropTypes.string.isRequired,
};

export default CreatePostForm;