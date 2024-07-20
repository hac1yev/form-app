import { Box, Grid, Toolbar } from "@mui/material";
import PostRightbar from "../../components/Post/PostRightbar";
import PostComponent from "../../components/Post/PostComponent";

const Post = () => {
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
                    <PostComponent />
                </Grid>
                <Grid container lg={4} sx={{ px: 1 }} className="post-grid">
                    <PostRightbar />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Post