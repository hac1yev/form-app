/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Input,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CreatePostForm from "./CreatePostForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts } from "../../store/postSlice";
import { authSliceActions } from "../../store/auth-slice";

const CreatePost = () => {
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const [postFormValue, setPostFormValue] = useState("");
  const [textContent, setTextContent] = useState("");
  const [heading, setHeading] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("content", textContent);
    formData.append("community_id", selectedCategory);

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      const response = await axios.post(
        "https://sorblive.com:8080/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(false);

      const myPostsResponse = await axios.get(
        "https://sorblive.com:8080/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = myPostsResponse;

      dispatch(authSliceActions.addPost(data.posts[0]));
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <Box className="create-post-form-wrapper" onClick={() => setOpen(true)}>
        <Input sx={{ display: "none" }} />
        <Box className="space-between create-post-form">
          <Box sx={{ px: 3 }} className="space-between">
            <Typography variant="subtitle1">Post yarat</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CameraAltOutlinedIcon sx={{ color: "rgba(0, 0, 0, 0.55)" }} />
              <LinkOutlinedIcon sx={{ color: "rgba(0, 0, 0, 0.55)" }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        className="dialog-wrapper"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle variant="h4">Yarat</DialogTitle>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ width: "100%", my: 2 }}
        >
          <CreatePostForm
            setHeading={setHeading}
            setPostFormValue={setPostFormValue}
            postFormValue={postFormValue}
            setTextContent={setTextContent}
            setImages={setImages}
            images={images}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          <DialogActions sx={{ mt: 2 }}>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              sx={{ bgcolor: "secondary.main", color: "rgba(0, 0, 0, 0.55)" }}
            >
              Ləğv et
            </Button>
            <Button type="submit" variant="contained">
              Paylaş
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default CreatePost;
