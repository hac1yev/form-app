/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import CreatePostForm from "./CreatePostForm";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { authSliceActions } from "../../store/auth-slice";
const CreateCommunity = () => {
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const [postFormValue, setPostFormValue] = useState("");

  const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
  }));

  const [open, setOpen] = useState(false);
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
    formData.append("category_id", selectedCategory);
    formData.append("cdate", new Date().toISOString());
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("image", image);
      });
    }

    let form = Array.from(formData);
    let formObejct = Object.fromEntries(form);

    try {
      const response = await axios.post(
        "http://209.38.241.78:8080/new-community",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      

      dispatch(authSliceActions.addCommunities({ ...formObejct, id: response.data.community_id }));
      setTitle("");
      setDescription("");
      setPostFormValue("");
      setSelectedCategory("");
      setImages(null);
      setOpen(false);
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
      <Box className="create-post-form-wrapper" onClick={() => setOpen(true)}>
        <Input sx={{ display: "none" }} />
        <Box className="space-between create-post-form">
          <Box sx={{ px: 3 }} className="space-between">
            <Typography variant="subtitle1">Community yarat</Typography>
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
            setHeading={setTitle}
            setPostFormValue={setPostFormValue}
            postFormValue={postFormValue}
            setTextContent={setDescription}
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
      {/* I will add my Communities Component in here after getting response */}
    </>
  );
};

export default CreateCommunity;
