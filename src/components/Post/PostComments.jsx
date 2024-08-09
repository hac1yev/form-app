import { ListItem,ListItemAvatar,ListItemText,Avatar, List, Box, Typography, IconButton, Paper, Popover, ListItemIcon, ListItemButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PropTypes from 'prop-types';
import moment from 'moment';

const PostComments = ({ comments }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const response = 1;
    const [expand,setExpand] = useState(false);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <List sx={{ p: 2 }}>
            {comments.map((comment) => (
                <ListItem sx={{ p: 0, mb: 2 }} className='comment-list-item' key={comment.id}>
                <Paper className='comment-paper'>
                    <ListItemAvatar>
                        <Avatar alt="User Name" src={`http://195.35.56.202:8080/${comment.picture}`} />
                    </ListItemAvatar>
                    <Box className="comment-content">
                        <ListItemText 
                            secondary={`${moment(comment.cdate).from(moment(new Date()))}`} 
                            primary={`${comment.username}`} 
                            className='comment-header-text' 
                            sx={{ mb: 0 }} 
                        />
                        <Typography variant='subtitle1'>
                            {comment.content}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: '8px' }}>
                            <Typography variant='subtitle3' sx={{ cursor: 'pointer' }}>{comment.likes} Bəyənmə</Typography>
                            <Typography variant='subtitle3' sx={{ cursor: 'pointer' }}>Cavab yaz</Typography>
                        </Box>
                        <Box className="expand-replies" onClick={() => setExpand(prev => !prev)}>
                            {!expand && <ExpandMoreIcon sx={{ color: 'rgb(2, 66, 137)' }} />}
                            {expand && <ExpandLessIcon sx={{ color: 'rgb(2, 66, 137)' }} />}
                            {response} yanıt
                        </Box>
                    </Box>
                    <IconButton className='more-icon' aria-describedby={id} onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreHorizIcon />
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
                </Paper>
                {response > 0 && expand && <Paper className='reply-paper'>
                    <ListItemAvatar>
                        <Avatar alt="User Name" src="https://avatars.githubusercontent.com/u/99089581?v=4" />
                    </ListItemAvatar>
                    <Box className="comment-content">
                        <ListItemText primary="İlkin Hacıyev" secondary="1 saat öncə" sx={{ mb: 0 }} className='comment-header-text' />
                        <Typography variant='subtitle1'>Təşəkkürlər</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: '8px' }}>
                            <Typography variant='subtitle3' sx={{ cursor: 'pointer' }}>Bəyən</Typography>
                            <Typography variant='subtitle3' sx={{ cursor: 'pointer' }}>Cavab yaz</Typography>
                        </Box>
                    </Box>
                    <IconButton className='more-icon' aria-describedby={id} onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreHorizIcon />
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
                </Paper>}
            </ListItem>
            ))}
        </List>
    );
};

PostComments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default PostComments;