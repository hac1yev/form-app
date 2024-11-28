import {
  Box,
  Button,
  DialogActions,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import AddCategoryToPost from "./AddCategoryToPost";
import AddImageToPost from "./AddImageToPost";
import { styled } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { authSliceActions } from "../../store/auth-slice";

const Community = () => {
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const [postFormValue, setPostFormValue] = useState("");

  const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
  }));

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    // formData.append("community_id", 1);

    // if (images && images.length > 0) {
    //   images.forEach((image) => {
    //     formData.append("images", image);
    //   });
    // }
    try {
      const response = await axios.post(
        "http://209.38.241.78:8080/new-community",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const myCommunities = await axios.get(
        "http://209.38.241.78:8080/user-communities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = myCommunities;

      dispatch(authSliceActions.getUserCommunties(data));
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handlePostFormChange = (content, delta, source, editor) => {
    setPostFormValue(content);
    setDescription(editor.getText());
  };

  return (
    <>
      <Box className="dialog-wrapper">
        <Typography variant="h4">Community Yarat</Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ width: "100%", my: 2 }}
        >
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
                onChange={(e) => setTitle(e.target.value)}
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
            />
          </Box>
          <Box>
            <AddImageToPost setImages={setImages} images={images} />
          </Box>

          <DialogActions sx={{ mt: 2 }}>
            <Button
              type="button"
              sx={{ bgcolor: "secondary.main", color: "rgba(0, 0, 0, 0.55)" }}
            >
              Ləğv et
            </Button>
            <Button type="submit" variant="contained">
              Paylaş
            </Button>
          </DialogActions>
        </Box>
      </Box>
      {/* I will add my Communities Component in here after getting response */}
    </>
  );
};

export default Community;
