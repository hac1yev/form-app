import { Box, Grid, Toolbar } from '@mui/material';
import Community from '../../components/Home/Community';
import Posts from '../../components/Home/Posts';
import '../Home/Home.scss';

const Popular = () => {
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
                    <Posts />
                </Grid>
                <Grid container lg={4} sx={{ px: 1 }} className='home-grid'>
                    <Community />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Popular;