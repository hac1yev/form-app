import { alpha, Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, styled, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoopIcon from '@mui/icons-material/Loop';
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IosShareIcon from '@mui/icons-material/IosShare';
import SendIcon from '@mui/icons-material/Send';
import '../../pages/Post/Post.scss';
import PostComments from "./PostComments";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  background: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
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
  const id = open ? 'simple-popover' : undefined;

  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const { postId } = useParams();
  const [postData,setPostData] = useState();
  const [comments,setComments] = useState([]);
  const [commentText,setCommentText] = useState("");

  useEffect(() => {
    (async function getPostData() {
      try {
        const response = await axios.get(`http://195.35.56.202:8080/post/${postId}`);

        setPostData(response.data.post);
        setComments(response.data.comments);
        console.log(response);
        
      } catch (error) {
        console.log(error);
      }
    })()
  }, [postId]);
  
  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://195.35.56.202:8080/comment", 
        { post_id: postId, content: commentText },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const comment = { ...response.data }

      const allComments = [...comments, comment];
      
      console.log(allComments);

    } catch (error) {
      console.log(error);
    }
    
    setCommentText("")
  };

  if(!postData) {
    return (
      <Typography className="flex-column">
        Loading...
      </Typography>
    )
  }

  return (
    <Grid item>
      <Card
        sx={{
          width: "100%",
          background: 'rgba(4, 118, 168, 0.03)'
        }}
      >
        <CardHeader
          avatar={
            <Avatar src={`http://195.35.56.202:8080/${postData.picture}`} sx={{ bgcolor: "red" }} aria-label="recipe" />
          }
          action={
            <>
              <IconButton aria-label="settings" aria-describedby={id} onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>
              <Popover
                className='comment-popover'
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
              >
                <List sx={{ pb: '10px', width: '130px' }}>
                    <ListItem
                        disablePadding
                        className="sidebar-list-item"
                    >
                        <ListItemButton sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <LoopIcon />
                            </ListItemIcon>
                            <ListItemText primary="Paylaş" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        className="sidebar-list-item"
                    >
                        <ListItemButton sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <IosShareIcon />
                            </ListItemIcon>
                            <ListItemText primary="Göndər" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        className="sidebar-list-item"
                    >
                        <ListItemButton sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <VisibilityOffOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gizlət" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        className="sidebar-list-item"
                    >
                        <ListItemButton sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
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
            <div style={{ display: 'flex', gap: '5px' }}>
              <span>{postData.username}</span>
              {`>`}
              <span style={{ color: '#999' }}>{postData.community_name}</span>
            </div>
          }
          subheader="01.04.2024"
        />
        <CardContent>
          <Typography variant="h6">
            {postData.heading}
          </Typography>
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
              image={`http://195.35.56.202:8080/${postData.images}`}
            />
          ) : (
            <Slider {...sliderSettings} className="post-slick-slider">
              {postData.images.split(", ").map((image, idx) => (
                <CardMedia
                  component={"img"}
                  key={idx}
                  className="post-image"
                  image={`http://195.35.56.202:8080/${image}`}
                  alt={`Post image ${idx + 1}`}
                />
              ))}
            </Slider>
          )}
        </Box>
        <CardActions
          disableSpacing
          className="space-between"
          sx={{ mt: 1, px:2 }}
        >
          <Box>
            <IconButton aria-label="add to favorites" sx={{ bgcolor: 'rgba(51, 51, 51, 0.08)', borderRadius: '19px', p: '5px 15px'  }}>
              <Typography variant="subtitle2" sx={{ mr: '3px' }}>{postData.likes}</Typography>
              <FavoriteBorderIcon sx={{ fontSize: '20px', color: 'rgba(2, 66, 137, 1)' }} />
            </IconButton>
            <IconButton aria-label="share" sx={{ bgcolor: 'rgba(51, 51, 51, 0.08)', ml: 1, borderRadius: '19px', p: '5px 15px' }}>
              <Typography variant="subtitle2" sx={{ mr: '3px' }}>{comments.length}</Typography>
              <ChatBubbleOutlineIcon sx={{ fontSize: '20px', color: 'rgba(2, 66, 137, 1)' }} />
            </IconButton>
          </Box>
          <IconButton aria-label="share">
            <BookmarkBorderIcon sx={{ color: '#000' }} />
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
            <Button
              type="submit"              
              sx={{ ml: 1, height: "100%", p: '0 3px' }}
            >
            
              <SendIcon sx={{ color: 'primary.main' }} />
            </Button>
          </Search>
        </Box>
        <Typography variant="h5" sx={{ px: 2 }}>Commentlər:</Typography>
        <PostComments comments={comments} setComments={setComments} />
      </Card>
    </Grid>
  );
};

export default PostComponent;