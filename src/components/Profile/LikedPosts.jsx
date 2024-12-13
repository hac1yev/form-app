import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LoopIcon from "@mui/icons-material/Loop";
import IosShareIcon from "@mui/icons-material/IosShare";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authSliceActions } from "../../store/auth-slice";

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

const LikedPosts = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const isLoading = useSelector((state) => state.loadingReducer.isLoading);
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const dispatch = useDispatch();
  const loginedUserId = JSON.parse(localStorage.getItem("userInfo"))?.user_id;
  const handleDelete = async (postId) => {
    try {
      await axios.delete("https://sorblive.com:8080/post", {
        data: { post_id: postId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(authSliceActions.deleteMyPost(postId));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getLikedPosts = async () => {
      try {
        const response = await axios.get(
          "https://sorblive.com:8080/liked-post",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLikedPosts();
  }, []);

  console.log(likedPosts);

  if (isLoading) {
    return (
      <Box className="flex-column">
        <Typography>Yüklənir...</Typography>
      </Box>
    );
  }

  if (!isLoading && likedPosts.length === 0) {
    return (
      <Box className="flex-column">
        <Typography>There is no post!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ gap: "20px", display: "flex", flexDirection: "column" }}>
      {likedPosts?.map((item) => (
        <Grid item key={item.id} sx={{ width: "100%" }} className="asdasa">
          <Card
            sx={{
              width: "100%",
              background:
                "linear-gradient(90deg, rgba(219, 244, 255, 0.09) 2.55%, #FFFFFF 100%)",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={`https://sorblive.com:8080/${item.picture}`}
                  aria-label="recipe"
                >
                  {item.username[0].toUpperCase()}
                </Avatar>
              }
              action={
                <>
                  <IconButton
                    aria-label="settings"
                    aria-describedby={item.id}
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                      setOpenPopoverId(item.id);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Popover
                    className="comment-popover"
                    id={item.id}
                    open={openPopoverId === item.id ? true : false}
                    anchorEl={anchorEl}
                    onClose={() => {
                      setAnchorEl(null);
                      setOpenPopoverId("");
                    }}
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
                      {likedPosts.id === loginedUserId && (
                        <>
                          <ListItem
                            disablePadding
                            className="sidebar-list-item"
                          >
                            <ListItemButton sx={{ py: 0 }}>
                              <ListItemIcon sx={{ minWidth: "40px" }}>
                                <VisibilityOffOutlinedIcon />
                              </ListItemIcon>
                              <ListItemText primary="Gizlət" />
                            </ListItemButton>
                          </ListItem>
                          <ListItem
                            onClick={() => handleDelete(item.id)}
                            disablePadding
                            className="sidebar-list-item"
                          >
                            <ListItemButton sx={{ py: 0 }}>
                              <ListItemIcon sx={{ minWidth: "40px" }}>
                                <DeleteIcon />
                              </ListItemIcon>
                              <ListItemText primary="Sil" />
                            </ListItemButton>
                          </ListItem>
                        </>
                      )}
                    </List>
                  </Popover>
                </>
              }
              title={
                <div style={{ display: "flex", gap: "5px" }}>
                  <Link className="post-link" to={`/user/${item.user_id}`}>
                    <span>{item.username}</span>
                  </Link>
                  {`>`}
                  <Link
                    to={`/community/${item.community_id}`}
                    className="post-link"
                  >
                    <span>{item.community_name}</span>{" "}
                  </Link>
                </div>
              }
              subheader={`${item.cdate.slice(0, 10)}`}
            />
            <Link to={`/posts/${item.id}`} className="post-link">
              <CardContent>
                <Typography variant="h6">{item.heading}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  ></p>
                </Typography>
              </CardContent>
              <Box sx={{ px: 2, borderRadius: "19px" }}>
                {item.images.split(", ").length === 1 ? (
                  <CardMedia
                    component={"img"}
                    className="post-image"
                    image={`https://sorblive.com:8080/${item.images}`}
                  />
                ) : (
                  <Slider {...sliderSettings} className="post-slick-slider">
                    {item.images.split(", ").map((image, idx) => (
                      <CardMedia
                        component={"img"}
                        key={idx}
                        className="post-image"
                        image={`https://sorblive.com:8080/${image}`}
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
                <IconButton disabled aria-label="add to favorites">
                  <Typography style={{ marginRight: "3px" }} variant="h6">
                    {item?.likes}
                  </Typography>
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton disabled aria-label="share">
                  <Typography style={{ marginRight: "3px" }} variant="h6">
                    {item?.comment_count}
                  </Typography>
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

LikedPosts.propTypes = {
  likedPosts: PropTypes.array.isRequired,
};

export default LikedPosts;
