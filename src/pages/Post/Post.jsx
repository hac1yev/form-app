import { Box, Grid, Toolbar } from "@mui/material";
// import PostRightbar from "../../components/Post/PostRightbar";
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
        <Grid item lg={8} sx={{ px: 1, width: "100%" }}>
          <PostComponent />
        </Grid>
        <Grid item lg={4} sx={{ px: 1 }} className="post-grid">
          {/* <PostRightbar /> */}
          <Box p={2}>
            <h1>Burada sizin də reklamınız ola bilər</h1>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Post;
