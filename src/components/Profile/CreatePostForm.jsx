import { Grid, OutlinedInput, styled } from "@mui/material";
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const CreatePostForm = () => {
    const [value, setValue] = useState('');
    const [textContent, setTextContent] = useState('');

    const handleChange = (content, delta, source, editor) => {
        setValue(content);
        setTextContent(editor.getText());
    };

    console.log(textContent);

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
                />
                {/* <Box component={"span"} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>0/100</Box> */}
            </FormGrid>
            <ReactQuill
                theme="snow"
                style={{ height: '150px', margin: '20px 0' }}
                value={value}
                onChange={handleChange}
            />
        </>
    );
};

export default CreatePostForm;
