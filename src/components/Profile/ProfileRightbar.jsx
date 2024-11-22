import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import GetAxios from "../../hooks/GetAxios";

const profile_community_data = [
  {
    id: "t1",
    img: "/community/c1.svg",
    title: "Texnologiya",
  },
  {
    id: "t2",
    img: "/community/c2.svg",
    title: "Dizayn",
  },
  {
    id: "t3",
    img: "/community/c3.svg",
    title: "Proqramlaşdırma",
  },
  {
    id: "t4",
    img: "/community/c4.svg",
    title: "Muhasibatliq",
  },
];

const ProfileRightbar = ({ userInfo }) => {
  const [profilePicture, setProfilePicture] = useState();
  const fileInputRef = useRef(null);
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const handleClick = (event) => {
    fileInputRef.current.click();
  };

  const handleSaveProf = async () => {
    try {
      const formData = new FormData();
      formData.append("picture", profilePicture);
      const response = await axios.post(
        "http://209.38.241.78:8080/upload/picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("Profile picture uploaded successfully");
        setProfilePicture(null);
        // fetchPersonalInteredtData()
        //   .then(() => console.log("Data fetched successfully"))
        //   .catch((error) => console.error("Error in fetchPersonalInteredtData:", error));
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const fetchPersonalInteredtData = async () => {
    try {
      const response = await GetAxios(
        "http://209.38.241.78:8080/users/me",
        token
      );
      setUserdata(response.data);
      // dispatch(fetchPersonalInterests(response.data.interests))
      setSelectedFile(null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    } else {
      return;
    }
  };

  return (
    <Grid item className="profile-list">
      <Box sx={{ background: "#fff", p: 2 }}>
        <Box display="flex" alignItems="center" gap="10px">
          <Input
            type="file"
            inputRef={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            inputProps={{ accept: "image/png, image/gif, image/jpeg" }}
          />
          <Box
            onClick={handleClick}
            className="profile-img-wrap"
            position="relative"
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                width="100"
                style={{ borderRadius: "50%", objectFit: "cover" }}
                height="100"
                alt="Selected"
              />
            ) : (
              <img
                src={`http://209.38.241.78:8080/${userInfo?.picture}`}
                width="100"
                height="100"
                style={{ borderRadius: "50%", objectFit: "cover" }}
                alt="Default"
              />
            )}
            <Box
              className="profile-img-icon"
              sx={{ position: "absolute", bottom: 0, right: 0 }}
            >
              <CreateOutlinedIcon />
            </Box>
          </Box>
          <Box>
            <Typography variant="h4">{`${userInfo?.first_name} ${userInfo?.last_name}`}</Typography>
            <Typography variant="subtitle1">{userInfo?.email}</Typography>
            {profilePicture ? (
              <button className="upload-pic" onClick={handleSaveProf}>
                Yadda Saxla
              </button>
            ) : null}
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ my: 2 }}>
          React development. Open source is great for many things.
        </Typography>

        <Box sx={{ display: "flex", gap: "40px" }}>
          <Box className="flex-column" gap="7px">
            <Typography variant="h4">49</Typography>
            <Typography variant="subtitle2" sx={{ color: "#000" }}>
              Üzv
            </Typography>
          </Box>
          <Box className="flex-column" gap="7px">
            <Typography variant="h4">230</Typography>
            <Typography variant="subtitle2" sx={{ color: "#000" }}>
              Post
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h4" sx={{ my: 1 }}>
            Maraqlarım
          </Typography>
          <Stack
            direction="row"
            className="profile-interests-stack"
            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
          >
            <Chip label="#Dizayn" sx={{ fontSize: "16px", mt: 1 }} />
            <Chip label="#Texnologiya" sx={{ fontSize: "16px", mt: 1 }} />
            <Chip label="#Proqramlaşdırma" sx={{ fontSize: "16px", mt: 1 }} />
            <Chip label="#3D" sx={{ fontSize: "16px", mt: 1 }} />
          </Stack>
          <Button
            variant="contained"
            color="inherit"
            sx={{ my: 2 }}
            className="profile-interest-add-button"
          >
            Əlavə et
          </Button>
        </Box>

        <Divider sx={{ mt: 2 }} />

        <Grid item>
          <Box
            sx={{
              background: "#fff",
              py: 2,
              height: "fit-content",
              position: "sticky",
              top: "112px",
            }}
            className="community-box"
          >
            <Typography sx={{ fontSize: "22px", pb: 0, fontWeight: "600" }}>
              Community
            </Typography>
            <Grid
              container
              sx={{ flexWrap: "wrap", justifyContent: "space-around" }}
            >
              {profile_community_data.map((item) => (
                <Grid item key={item.id} sm={6} sx={{ mt: 2 }}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <Box component="img" src={item.img} />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "19px",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Button
          variant="contained"
          color="inherit"
          className="profile-interest-add-button"
        >
          Əlavə et
        </Button>
      </Box>
    </Grid>
  );
};

ProfileRightbar.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default ProfileRightbar;
