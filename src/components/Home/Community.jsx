import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useGetAxios from "../../hooks/useGetAxios";

const Community = () => {
  const communityNames = useGetAxios("communities");
  return (
    <Grid item className="community-list">
      <Box sx={{ background: "#fff", py: 4 }} className="community-box">
        <Typography
          sx={{
            fontSize: "22px",
            px: 5,
            pb: 2,
            fontWeight: "600",
            lineHeight: "30px",
          }}
        >
          Community
        </Typography>
        <Container>
          <Grid container>
            {communityNames?.map((item, index) => (
              <Box key={index}>
                <Grid key={item.id}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <Box>
                      <Box
                        component="img"
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
                    </Box>
                  </Link>
                </Grid>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

export default Community;
