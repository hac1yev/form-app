import { Box, Grid, Toolbar, useMediaQuery } from '@mui/material';
import '../pages/Home/Home.scss';
import { Outlet } from 'react-router-dom';
import Community from './Home/Community';

const Home = () => {
  const matches = useMediaQuery("(min-width:769px)");

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
          mt: !matches ? 2 : 0
        }}  
    >
        <Toolbar />
        <Grid container sx={{ py: 6, px: 1 }}>
          <Grid item lg={8} sx={{ px: 1 }} className='home-grid'>
              <Outlet />
          </Grid>
          <Grid item lg={4} sx={{ px: 1 }} className='home-grid'>
            <Community />
          </Grid>
        </Grid>
    </Box>
  )
}

export default Home