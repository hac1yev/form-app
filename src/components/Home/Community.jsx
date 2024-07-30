import { Box, Container, Grid, Typography } from "@mui/material";
import { community_data } from "../../dummy-data/communitydata";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <Grid item className="community-list">
      <Box sx={{ background: '#fff', py: 4 }} className="community-box">
        <Typography sx={{ fontSize: '22px', px: 5, pb: 2, fontWeight: '600', lineHeight: '30px' }}>Community</Typography>
        <Container>
          <Grid container>
            {community_data.map((item, index) => (
              <Box key={index}>
                {item.map((obj) => (
                  <Grid item key={obj.id} >
                    <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                        <Box component="img" src={obj.img} />
                      <Typography sx={{ fontSize: '14px', fontWeight: '600', lineHeight: '19px' }}>{obj.title}</Typography>
                    </Link>
                  </Grid>
                ))}
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

export default Community;
