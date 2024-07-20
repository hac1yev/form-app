import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LoopIcon from '@mui/icons-material/Loop';
import IosShareIcon from '@mui/icons-material/IosShare';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { useState } from "react";

const MyPosts = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ gap: '20px', display: 'flex', flexDirection: 'column', }}>
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
          <Link to="/posts/37264"  className="post-link">
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
                height="400"
                image="https://avatars.githubusercontent.com/u/99089581?v=4"
                alt="Paella dish"
              />
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
          <Link to="/posts/37264"  className="post-link">
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
    </Box>
  );
};

export default MyPosts;
