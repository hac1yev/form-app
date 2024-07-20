import { Box, Button, Dialog, DialogActions, DialogTitle, Input, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import PropTypes from 'prop-types';
import CreatePostForm from "./CreatePostForm";

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
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Dialiasd");
    };

    return (
        <>
            <Box className="create-post-form-wrapper" onClick={handleClickOpen}>
                <Input
                    sx={{ display: 'none' }}
                />
                <Box className="space-between create-post-form">
                    <Box sx={{ px: 3 }} className="space-between">
                        <Typography variant="subtitle1">Yeni post yarat</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CameraAltOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.55)' }} />
                            <LinkOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.55)' }} />
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
                onClose={handleClose}
                onSubmit={handleSubmit}
                PaperProps={{
                    component: 'form',
                }}
            >
                <DialogTitle variant="h4">Yarat</DialogTitle>
                <Box sx={{ width: '100%', my: 2 }}>
                    <Box>
                        <Tabs value={value} onChange={handleChange} className="dialog-ul" aria-label="basic tabs example" >
                            <Tab label="Mətn" {...a11yProps(0)} className={value === 0 ? "active tab-li" : "tab-li"} />
                            <Tab label="Şəkil & Video" {...a11yProps(1)} className={value === 1 ? "active tab-li" : "tab-li"} />
                            <Tab label="Link" {...a11yProps(2)} className={value === 2 ? "active tab-li" : "tab-li"} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <CreatePostForm />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ bgcolor: 'secondary.main', color: 'rgba(0, 0, 0, 0.55)' }}>Yadda saxla</Button>
                    <Button type="submit" sx={{ bgcolor: 'secondary.main', color: 'rgba(0, 0, 0, 0.55)' }}>Sil</Button>
                    <Button type="submit" variant="contained">Paylaş</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreatePost;