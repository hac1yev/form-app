import { Box, Grid, Toolbar } from "@mui/material";
import "./Profile.scss";
import ProfileComponent from "../../components/Profile/ProfileComponent";
import ProfileRightbar from "../../components/Profile/ProfileRightbar";
import useGetAxios from "../../hooks/useGetAxios";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const { pathname } = useLocation();
  let requestedUser;
  if (pathname.includes("/user")) {
    let pathName = pathname.split("/").at(-1);
    requestedUser = useGetAxios(`users/${pathName}`);
  } else {
    requestedUser = useGetAxios(`users/me`);
  }
    console.log("🚀 ~ Profile ~ requestedUser:", requestedUser)

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Grid container sx={{ py: 6, px: 1 }}>
        <Grid item lg={8} sx={{ px: 1, width: "100%" }}>
          <ProfileComponent myPosts={requestedUser} />
        </Grid>
        <Grid item lg={4} sx={{ px: 1 }} className="profile-grid">
          <ProfileRightbar userInfo={requestedUser} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
