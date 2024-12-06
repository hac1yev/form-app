import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  List,
  Box,
  Typography,
  IconButton,
  Paper,
  Popover,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import { getTimeElapsed } from "../Helpers/Utility";
import likeIcon from "../../assets/like.svg";

const PostComments = ({ comments, setComments, getPostData }) => {
  const token = useSelector((state) => state.authReducer.userInfo?.token);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPopover, setSelectedPopover] = useState("");
  const response = 1;
  const [expand, setExpand] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLikeComment = async (commentId) => {
    try {
      const response = await axios.post(
        "https://sorblive.com:8080/like/comment",
        { comment_id: commentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        getPostData();
        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            comment.likes += 1;
            return comment;
          }
          return comment;
        });

        setComments(updatedComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <List sx={{ p: 2 }}>
      {comments
        .toSorted(
          (a, b) => new Date(b.cdate).getTime() - new Date(a.cdate).getTime()
        )
        .map((comment) => (
          <ListItem
            sx={{ p: 0, mb: 2 }}
            className="comment-list-item"
            key={comment.id}
          >
            <Paper className="comment-paper">
              <ListItemAvatar>
                <Avatar
                  alt="User Name"
                  src={`https://sorblive.com:8080/${comment.picture}`}
                />
              </ListItemAvatar>
              <Box className="comment-content">
                <ListItemText
                  secondary={getTimeElapsed(comment.cdate)}
                  primary={`${comment.username}`}
                  className="comment-header-text"
                  sx={{ mb: 0 }}
                />
                <Typography variant="subtitle1">{comment.content}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    mt: "8px",
                  }}
                >
                  {comment.is_user_liked === 0 ? (
                    <Typography
                      variant="subtitle3"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      Bəyən -
                    </Typography>
                  ) : (
                    <Typography
                      variant="subtitle2"
                      display={"flex"}
                      gap={'3px'}
                      sx={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "20px",
                        bottom: "20px",
                      }}
                    >
                      {comment.likes}{" "}
                      <img style={{ width: "15px" }} src={likeIcon} alt="" />
                    </Typography>
                  )}

                  <Typography variant="subtitle3" sx={{ cursor: "pointer" }}>
                    Cavab yaz
                  </Typography>
                </Box>
                <Box
                  className="expand-replies"
                  onClick={() => setExpand((prev) => !prev)}
                >
                  {!expand && (
                    <ExpandMoreIcon sx={{ color: "rgb(2, 66, 137)" }} />
                  )}
                  {expand && (
                    <ExpandLessIcon sx={{ color: "rgb(2, 66, 137)" }} />
                  )}
                  {response} yanıt
                </Box>
              </Box>
              <IconButton
                className="more-icon"
                aria-describedby={id}
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setSelectedPopover(comment.id);
                }}
              >
                <MoreHorizIcon />
              </IconButton>
              <Popover
                className="comment-popover"
                id={id}
                open={selectedPopover === comment.id}
                anchorEl={anchorEl}
                onClose={() => {
                  setAnchorEl(null);
                  setSelectedPopover("");
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
            </Paper>
            {response > 0 && expand && (
              <Paper className="reply-paper">
                <ListItemAvatar>
                  <Avatar
                    alt="User Name"
                    src="https://avatars.githubusercontent.com/u/99089581?v=4"
                  />
                </ListItemAvatar>
                <Box className="comment-content">
                  <ListItemText
                    primary="İlkin Hacıyev"
                    secondary="1 saat öncə"
                    sx={{ mb: 0 }}
                    className="comment-header-text"
                  />
                  <Typography variant="subtitle1">Təşəkkürlər</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      mt: "8px",
                    }}
                  >
                    <Typography variant="subtitle3" sx={{ cursor: "pointer" }}>
                      Bəyən
                    </Typography>
                    <Typography variant="subtitle3" sx={{ cursor: "pointer" }}>
                      Cavab yaz
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  className="more-icon"
                  aria-describedby={id}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setSelectedPopover(comment.id);
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Popover
                  className="comment-popover"
                  id={id}
                  open={selectedPopover === comment.id}
                  anchorEl={anchorEl}
                  onClose={() => {
                    setAnchorEl(null);
                    setSelectedPopover("");
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
              </Paper>
            )}
          </ListItem>
        ))}
    </List>
  );
};

PostComments.propTypes = {
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  getPostData: PropTypes.func.isRequired,
};

export default PostComments;
