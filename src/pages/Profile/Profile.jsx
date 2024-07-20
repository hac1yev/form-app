import { Box, Grid, Toolbar } from '@mui/material';
import './Profile.scss';
import ProfileComponent from '../../components/Profile/ProfileComponent';
import ProfileRightbar from '../../components/Profile/ProfileRightbar';

const Profile = () => {
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
                <Grid container lg={8} sx={{ px: 1 }}>
                    <ProfileComponent />
                </Grid>
                <Grid container lg={4} sx={{ px: 1 }} className="profile-grid">
                    <ProfileRightbar />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;