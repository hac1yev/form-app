import { useRef, useState } from 'react';
import { Avatar, Box, Button, Chip, Divider, Grid, Input, Stack, Typography } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const profile_community_data = [
    {
        id: 't1',
        img: '/community/c1.svg',
        title: 'Texnologiya'
    },
    {
        id: 't2',
        img: '/community/c2.svg',
        title: 'Dizayn'
    },
    {
        id: 't3',
        img: '/community/c3.svg',
        title: 'Proqramlaşdırma',

    },
    {
        id: 't4',
        img: '/community/c4.svg',
        title: 'Muhasibatliq'
    },
];

const ProfileRightbar = ({ userInfo }) => {
  const [profilePicture, setProfilePicture] = useState(`/api/${userInfo?.picture}`);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid item className="profile-list">
      <Box sx={{ background: '#fff', p: 2 }}>

        <Box display="flex" alignItems="center" gap="10px">
          <Input
            type="file"
            inputRef={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            inputProps={{ accept: "image/png, image/gif, image/jpeg" }}
          />
          <Box onClick={handleClick} className="profile-img-wrap" position="relative">
            <Avatar className='profile-img' src={profilePicture} />
            <Box className="profile-img-icon" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
              <CreateOutlinedIcon />
            </Box>
          </Box>
          <Box>
            <Typography variant="h4">{`${userInfo?.first_name} ${userInfo?.last_name}`}</Typography>
            <Typography variant="subtitle1">{userInfo?.email}</Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ my: 2 }}>React development. Open source is great for many things.</Typography>

        <Box sx={{ display: 'flex', gap: '40px' }}>
          <Box className="flex-column" gap="7px">
            <Typography variant="h4">49</Typography>
            <Typography variant="subtitle2" sx={{ color: '#000' }}>Üzv</Typography>
          </Box>
          <Box className="flex-column" gap="7px">
            <Typography variant="h4">230</Typography>
            <Typography variant="subtitle2" sx={{ color: '#000' }}>Post</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
            <Typography variant="h4" sx={{ my: 1 }}>Maraqlarım</Typography>
            <Stack direction="row" className='profile-interests-stack' sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label="#Dizayn" sx={{ fontSize: '16px', mt: 1 }} />
                <Chip label="#Texnologiya" sx={{ fontSize: '16px', mt: 1 }} />
                <Chip label="#Proqramlaşdırma" sx={{ fontSize: '16px', mt: 1 }} />
                <Chip label="#3D" sx={{ fontSize: '16px', mt: 1 }} />
            </Stack>
            <Button variant='contained' color="inherit" sx={{ my: 2 }} className='profile-interest-add-button'>Əlavə et</Button>
        </Box>

        <Divider  sx={{ mt: 2 }} />

        <Grid item>
            <Box sx={{ background: '#fff', py: 2, height: 'fit-content', position: 'sticky', top: '112px' }} className="community-box">
                <Typography sx={{ fontSize: '22px', pb: 0, fontWeight: '600' }}>Community</Typography>
                <Grid container sx={{ flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {profile_community_data.map((item) => (
                        <Grid item key={item.id} sm={6} sx={{ mt: 2 }}>
                            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                                <Box component="img" src={item.img} />
                                <Typography sx={{ fontSize: '14px', fontWeight: '600', lineHeight: '19px' }}>{item.title}</Typography>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Grid>
        <Button variant='contained' color="inherit" className='profile-interest-add-button'>Əlavə et</Button>

      </Box>
    </Grid>
  );
};

ProfileRightbar.propTypes = {
  userInfo: PropTypes.object.isRequired
};

export default ProfileRightbar;