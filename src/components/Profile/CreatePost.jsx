import { Box, Button, Dialog, DialogActions, DialogTitle, Input, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import PropTypes from 'prop-types';
import CreatePostForm from "./CreatePostForm";
import AddImageToPost from "./AddImageToPost";
import AddCategoryToPost from "./AddCategoryToPost";
import axios from "axios";
import { useSelector } from "react-redux";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CreatePost = () => {
    const token = useSelector((state) => state.authReducer.userInfo?.token);
    const [postFormValue, setPostFormValue] = useState('');
    const [textContent, setTextContent] = useState('');
    const [heading, setHeading] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("");
    const [images, setImages] = useState(null);  // Initialize as null to hold File object
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const isDisabled = (textContent && images && postFormValue && selectedCategory) ? false : true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("heading", heading);
        formData.append("content", textContent);
        formData.append("community_id", 1);

        // Handle single or multiple images
        if (images) {
            if (Array.isArray(images)) {
                images.forEach((image, i) => formData.append(`images[${i}]`, image));
            } else {
                formData.append("images", images);
            }
        }

        try {
            const response = await axios.post("http://209.38.241.78:8080/post", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box className="create-post-form-wrapper" onClick={() => setOpen(true)}>
                <Input sx={{ display: 'none' }} />
                <Box className="space-between create-post-form">
                    <Box sx={{ px: 3 }} className="space-between">
                        <Typography variant="subtitle1">Yeni post yarat</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CameraAltOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.55)' }} />
                            <LinkOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.55)' }} />
                        </Box>
                    </Box>
                    <Button variant="contained" className="create-post-button">Yarat</Button>
                </Box>
            </Box>
            <Dialog
                className="dialog-wrapper"
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle variant="h4">Yarat</DialogTitle>
                <Box>
                    <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} className="dialog-ul" aria-label="basic tabs example">
                        <Tab label="Mətn" {...a11yProps(0)} className={value === 0 ? "active tab-li" : "tab-li"} />
                        <Tab label="Şəkil" {...a11yProps(1)} className={value === 1 ? "active tab-li" : "tab-li"} />
                        <Tab label="Kategoriya" {...a11yProps(2)} className={value === 2 ? "active tab-li" : "tab-li"} />
                    </Tabs>
                </Box>
                <Box component={"form"} onSubmit={handleSubmit} sx={{ width: '100%', my: 2 }}>
                    <CustomTabPanel value={value} index={0}>
                        <CreatePostForm 
                            setHeading={setHeading}
                            setPostFormValue={setPostFormValue} 
                            postFormValue={postFormValue} 
                            setTextContent={setTextContent}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <AddImageToPost 
                            setImages={setImages} 
                            images={images} 
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <AddCategoryToPost 
                            setSelectedCategory={setSelectedCategory}
                            selectedCategory={selectedCategory}
                        />
                    </CustomTabPanel>
                    <DialogActions sx={{ mt: 2 }}>
                        <Button type="button" onClick={() => setOpen(false)} sx={{ bgcolor: 'secondary.main', color: 'rgba(0, 0, 0, 0.55)' }}>Ləğv et</Button>
                        <Button type="submit" variant="contained" >Paylaş</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

export default CreatePost;
