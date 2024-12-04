import { useEffect, useRef, useState } from "react";
import {
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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../store/auth-slice";

// ctrl alt l
const ProfileRightbar = () => {
  const [profilePicture, setProfilePicture] = useState();
  const userInfo = useSelector((state) => state.authReducer.userMainInfos);
  const fileInputRef = useRef(null);
  const loginedUserId = JSON.parse(localStorage.getItem("userInfo"))?.user_id;
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const communities = useSelector(
    (state) => state.authReducer.userMainCommunities
  );

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const getPersonalCommunities = async () => {
      try {
        const response = await axios.get(
          "https://sorblive.com:8080/user-communities",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(authSliceActions.getUserCommunties(response));
      } catch (error) {
        console.log(error);
      }
    };

    getPersonalCommunities();
  }, [token, dispatch]);

  const handleSaveProf = async () => {
    try {
      const formData = new FormData();
      formData.append("picture", profilePicture);
      const response = await axios.post(
        "https://sorblive.com:8080/upload/picture",
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
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
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
                src={`https://sorblive.com:8080/${userInfo?.user?.picture}`}
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
            <Typography variant="h4">{`${userInfo?.user?.first_name} ${userInfo?.user?.last_name}`}</Typography>
            <Typography variant="subtitle1">{userInfo?.user?.email}</Typography>
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
            <Typography variant="h4">{userInfo?.posts?.length}</Typography>
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

          {userInfo?.user?.id === loginedUserId && (
            <Button
              variant="contained"
              color="inherit"
              sx={{ my: 2 }}
              className="profile-interest-add-button"
            >
              Əlavə et
            </Button>
          )}
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
              {communities?.data?.map((item) => (
                <Grid item key={item.id} sm={6} sx={{ mt: 2 }}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <Box
                      component="img"
                      style={{ objectFit: "cover" }}
                      src={`https://sorblive.com:8080/${item.picture}`}
                    />
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
        {userInfo?.user?.id === loginedUserId && (
          <Button
            variant="contained"
            color="inherit"
            sx={{ my: 2 }}
            className="profile-interest-add-button"
          >
            Əlavə et
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default ProfileRightbar;
