import { useState } from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LoopIcon from "@mui/icons-material/Loop";
import IosShareIcon from "@mui/icons-material/IosShare";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Slider from "react-slick";
import useGetAxios from "../../hooks/useGetAxios";
import { useSelector } from "react-redux";

const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  accessibility: false,
  focusOnSelect: false,
  focusOnChange: false,
  center: true,
};

const Posts = ({ endpoint }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const isLoading = useSelector((state) => state.loadingReducer.isLoading);
  const data = useGetAxios(endpoint);  

  if (isLoading) {
    return (
      <Box className="flex-column">
        <Typography>Yüklənir...</Typography>
      </Box>
    );
  }

  if(!isLoading && (!data || data.length === 0)) {
    return (
      <Box className="flex-column">
        <Typography>There is no post!</Typography>
      </Box>
    )
  }

  return (
    <Box className="post-wrapper" sx={{ gap: "20px", display: "flex", flexDirection: "column" }}>
      {endpoint.includes("search?key") && (
        <Typography variant="h2">AXTARIŞ NƏTİCƏSİ</Typography>
      )}
      {data.map((item) => (
        <Grid item key={item.id} sx={{ width: '100%' }} className="asdasa">
          <Card
            sx={{
              width: "100%",
              background:
                "linear-gradient(90deg, rgba(219, 244, 255, 0.09) 2.55%, #FFFFFF 100%)",
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} src={`http://209.38.241.78:8080/${item.picture}`} aria-label="recipe">
                  {item.username[0].toUpperCase()}
                </Avatar>
              }
              action={
                <>
                  <IconButton
                    aria-label="settings"
                    aria-describedby={id}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Popover
                    className="comment-popover"
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <List sx={{ pb: "10px", width: "130px" }}>
                      <ListItem disablePadding className="sidebar-list-item">
                        <ListItemButton sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: "40px" }}>
                            <LoopIcon />
                          </ListItemIcon>
                          <ListItemText primary="Paylaş" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding className="sidebar-list-item">
                        <ListItemButton sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: "40px" }}>
                            <IosShareIcon />
                          </ListItemIcon>
                          <ListItemText primary="Göndər" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding className="sidebar-list-item">
                        <ListItemButton sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: "40px" }}>
                            <VisibilityOffOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Gizlət" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding className="sidebar-list-item">
                        <ListItemButton sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: "40px" }}>
                            <DeleteIcon />
                          </ListItemIcon>
                          <ListItemText primary="Sil" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Popover>
                </>
              }
              title={
                <div style={{ display: "flex", gap: "5px" }}>
                  <span>{item.username}</span>
                  {`>`}
                  <span style={{ color: "#999" }}>{item.community_name}</span>
                </div>
              }
              subheader={`${item.cdate.slice(0,10)}`}
            />
            <Link to={`/posts/${item.id}`} className="post-link">
              <CardContent>
                <Typography variant="h6">{item.heading}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  <p dangerouslySetInnerHTML={{
                    __html: item.content
                  }}></p>
                </Typography>
              </CardContent>
              <Box sx={{ px: 2, borderRadius: "19px" }}>
                
                {item.images.split(", ").length === 1 ? (
                  <CardMedia
                    component={"img"}
                    className="post-image"
                    image={`http://209.38.241.78:8080/${item.images}`}
                  />
                ) : (
                  <Slider {...sliderSettings} className="post-slick-slider">
                    {item.images.split(", ").map((image, idx) => (
                        <CardMedia
                          component={"img"}
                          key={idx}
                          className="post-image"
                          image={`http://209.38.241.78:8080/${image}`}
                          alt={`Post image ${idx + 1}`}
                        />
                    ))}
                  </Slider>
                )}
              </Box>
            </Link>
            <CardActions
              disableSpacing
              className="space-between"
              sx={{ mt: 3 }}
            >
              <Box>
                <IconButton aria-label="add to favorites">
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ChatBubbleOutlineIcon />
                </IconButton>
              </Box>
              <IconButton aria-label="share">
                <BookmarkBorderIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Box>
  );
};

Posts.propTypes = {
  endpoint: PropTypes.string.isRequired
};

export default Posts;