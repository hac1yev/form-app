/* eslint-disable react/prop-types */
import { Box, Grid, OutlinedInput, styled } from "@mui/material";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddImageToPost from "./AddImageToPost";
import AddCategoryToPost from "./AddCategoryToPost";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const CreatePostForm = ({
  postFormValue,
  setPostFormValue,
  setTextContent,
  setHeading,
  setImages,
  images,
  setSelectedCategory,
  selectedCategory,
  communityModal,
}) => {
  const handlePostFormChange = (content, delta, source, editor) => {
    setPostFormValue(content);
    setTextContent(editor.getText());
  };


  return (
    <>
      <Box>
        <FormGrid item>
          <OutlinedInput
            sx={{ borderRadius: "14px" }}
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
          style={{ height: "100px", margin: "20px 0 " }}
          value={postFormValue}
          onChange={handlePostFormChange}
        />
      </Box>
      <Box>
        <AddCategoryToPost
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          communityModal={communityModal}
        />
      </Box>
      <Box>
        <AddImageToPost setImages={setImages} images={images} />
      </Box>
    </>
  );
};

CreatePostForm.propTypes = {
  setPostFormValue: PropTypes.func.isRequired,
  setTextContent: PropTypes.func.isRequired,
  setHeading: PropTypes.func.isRequired,
  postFormValue: PropTypes.string.isRequired,
  communityModal: PropTypes.bool.isRequired,
};

export default CreatePostForm;
