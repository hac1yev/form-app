import {
  alpha,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  styled,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoopIcon from "@mui/icons-material/Loop";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IosShareIcon from "@mui/icons-material/IosShare";
import SendIcon from "@mui/icons-material/Send";
import "../../pages/Post/Post.scss";
import PostComments from "./PostComments";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
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

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const Button = styled("button")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `1em`,
    paddingRight: `4em`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const PostComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const { postId } = useParams();
  const [postData, setPostData] = useState();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const loginedUserId = JSON.parse(localStorage.getItem("userInfo"))?.user_id;

  const getPostData = useCallback(async () => {
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await axios.get(
        `https://sorblive.com:8080/post/${postId}`,
        {
          headers,
        }
      );

      setPostData(response.data.post);
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [postId, token]);

  useEffect(() => {
    getPostData();
  }, [postId, getPostData]);

  const handleAddComment = useCallback(
    async (e) => {
      if (!token) {
        navigate("/login");
      }
      e.preventDefault();

      try {
        const response = await axios.post(
          "https://sorblive.com:8080/comment",
          { post_id: postId, content: commentText },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const comment = { ...response.data };

        const allComments = [comment, ...comments].toSorted(
          (a, b) => new Date(b.cdate).getTime() - new Date(a.cdate).getTime()
        );

        setComments(allComments);
        getPostData();
      } catch (error) {
        console.log(error);
      }

      setCommentText("");
    },
    [commentText, comments, getPostData, postId, token, navigate]
  );

  const handleAddLike = useCallback(async () => {
    try {
      await axios.post(
        "https://sorblive.com:8080/like/post",
        { post_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getPostData();
    } catch (error) {
      console.error("Error adding like:", error);
    }
  }, [getPostData, token, postId]);

  if (!postData && isLoading) {
    return <Typography className="flex-column">Loading...</Typography>;
  }

  if (!postData && !isLoading) {
    return (
      <Typography className="flex-column">There is no post data!</Typography>
    );
  }

  return (
    <Grid item>
      <Card
        sx={{
          width: "100%",
          background: "rgba(4, 118, 168, 0.03)",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={`https://sorblive.com:8080/${postData.picture}`}
              aria-label="recipe"
            />
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
              {token && (
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
                    {postData.user_id === loginedUserId && (
                      <>
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
                      </>
                    )}
                  </List>
                </Popover>
              )}
            </>
          }
          title={
            <div style={{ display: "flex", gap: "5px" }}>
              <Link to={`/user/${postData.user_id}`}>
                <span>{postData.username}</span>
              </Link>
              {`>`}
              <Link to={`/community/${postData.community_id}`}>
                <span>{postData.community_name}</span>{" "}
              </Link>
            </div>
          }
          subheader="01.04.2024"
        />
        <CardContent>
          <Typography variant="h6">{postData.heading}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{ __html: postData.content }}
          ></Typography>
        </CardContent>
        <Box sx={{ px: 2, borderRadius: "19px" }}>
          {postData.images.split(", ").length === 1 ? (
            <CardMedia
              component={"img"}
              className="post-image"
              image={`https://sorblive.com:8080/${postData.images}`}
            />
          ) : (
            <Slider {...sliderSettings} className="post-slick-slider">
              {postData.images.split(", ").map((image, idx) => (
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
        <CardActions
          disableSpacing
          className="space-between"
          sx={{ mt: 1, px: 2 }}
        >
          <Box>
            <IconButton
              onClick={handleAddLike}
              aria-label="add to favorites"
              sx={{
                bgcolor: "rgba(51, 51, 51, 0.08)",
                borderRadius: "19px",
                p: "5px 15px",
              }}
              disabled={postData.is_user_liked !== 0}
            >
              <Typography variant="subtitle2" sx={{ mr: "3px" }}>
                {postData.likes}
              </Typography>
              <FavoriteBorderIcon
                sx={{ fontSize: "20px", color: "rgba(2, 66, 137, 1)" }}
              />
            </IconButton>
            <IconButton
              aria-label="share"
              sx={{
                bgcolor: "rgba(51, 51, 51, 0.08)",
                ml: 1,
                borderRadius: "19px",
                p: "5px 15px",
              }}
              disabled
            >
              <Typography variant="subtitle2" sx={{ mr: "3px" }}>
                {comments.length}
              </Typography>
              <ChatBubbleOutlineIcon
                sx={{ fontSize: "20px", color: "rgba(2, 66, 137, 1)" }}
              />
            </IconButton>
          </Box>
          <IconButton aria-label="share">
            <BookmarkBorderIcon sx={{ color: "#000" }} />
          </IconButton>
        </CardActions>
        <Box className="comment-box" sx={{ my: 2 }}>
          <Search sx={{ height: "100%" }} onSubmit={handleAddComment}>
            <StyledInputBase
              placeholder="Comment yaz..."
              sx={{ width: "100%" }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            />
            <Button type="submit" sx={{ ml: 1, height: "100%", p: "0 3px" }}>
              <SendIcon sx={{ color: "primary.main" }} />
            </Button>
          </Search>
        </Box>
        <Typography variant="h5" sx={{ px: 2 }}>
          {comments.length} Comment
        </Typography>
        <PostComments
          getPostData={getPostData}
          comments={comments}
          setComments={setComments}
        />
      </Card>
    </Grid>
  );
};

export default PostComponent;
