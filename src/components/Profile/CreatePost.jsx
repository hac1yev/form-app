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
import PropTypes from "prop-types";
import CreatePostForm from "./CreatePostForm";
import axios from "axios";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const [postFormValue, setPostFormValue] = useState("");
  const [textContent, setTextContent] = useState("");
  const [heading, setHeading] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState(null); // Initialize as null to hold File object
  const [open, setOpen] = useState(false);
  const isDisabled =
    textContent && images && postFormValue && selectedCategory ? false : true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("content", textContent);
    formData.append("community_id", 1);

    // Debug: Check if images contain the expected File objects
    console.log("Images to upload:", images);

    // Append each file as a separate entry in formData
    if (images && images.length > 0) {
      images.forEach((image, i) => {
        formData.append("images", image); // Append each file directly
      });
    }

    try {
      const response = await axios.post(
        "http://209.38.241.78:8080/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server response:", response);
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
            <Typography variant="subtitle1">Yeni post yarat</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CameraAltOutlinedIcon sx={{ color: "rgba(0, 0, 0, 0.55)" }} />
              <LinkOutlinedIcon sx={{ color: "rgba(0, 0, 0, 0.55)" }} />
            </Box>
          </Box>
          <Button variant="contained" className="create-post-button">
            Yarat
          </Button>
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
