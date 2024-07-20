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
import { useState } from "react";

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
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              Ə
            </Avatar>
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
              <span>Əli Cəfərli</span>
              {`>`}
              <span style={{ color: '#999' }}>Web Dizayn</span>
            </div>
          }
          subheader="01.04.2024"
        />
        <CardContent>
          <Typography variant="h6">
            Top GitHub repositories
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <Box sx={{ px: 2, borderRadius: "19px" }}>
          <CardMedia
            sx={{ borderRadius: "19px" }}
            component="img"
            height="194"
            image="https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/2023-Ford-Mustang-Dark-Horse-red-press-image-1001x565p-(1).jpg"
            alt="Paella dish"
          />
        </Box>
        <CardActions
          disableSpacing
          className="space-between"
          sx={{ mt: 1, px:2 }}
        >
          <Box>
            <IconButton aria-label="add to favorites" sx={{ bgcolor: 'rgba(51, 51, 51, 0.08)', borderRadius: '19px', p: '5px 15px'  }}>
              <Typography variant="subtitle2" sx={{ mr: '3px' }}>40</Typography>
              <FavoriteBorderIcon sx={{ fontSize: '20px', color: 'rgba(2, 66, 137, 1)' }} />
            </IconButton>
            <IconButton aria-label="share" sx={{ bgcolor: 'rgba(51, 51, 51, 0.08)', ml: 1, borderRadius: '19px', p: '5px 15px' }}>
              <Typography variant="subtitle2" sx={{ mr: '3px' }}>21</Typography>
              <ChatBubbleOutlineIcon sx={{ fontSize: '20px', color: 'rgba(2, 66, 137, 1)' }} />
            </IconButton>
          </Box>
          <IconButton aria-label="share">
            <BookmarkBorderIcon sx={{ color: '#000' }} />
          </IconButton>
        </CardActions>
        <Box className="comment-box" sx={{ my: 2 }}>
          <Search sx={{ height: "100%" }}>
            <StyledInputBase
              placeholder="Comment yaz..."
              sx={{ width: "100%" }}
              inputProps={{ "aria-label": "search" }}
            />
            <Button
              type="submit"              
              sx={{ ml: 1, height: "100%", p: '0 3px' }}
            >
              <IconButton>
                <SendIcon sx={{ color: 'primary.main' }} />
              </IconButton>
            </Button>
          </Search>
        </Box>
        <Typography variant="h5" sx={{ px: 2 }}>Commentlər:</Typography>
        <PostComments />
      </Card>

    </Grid>
  );
};

export default PostComponent;