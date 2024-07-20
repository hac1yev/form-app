import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const PostRightbar = () => {
  return (
    <Grid item className="post-list">
      <Box sx={{ background: '#fff', p: 2 }}>

        <Box className="space-between">
          <Typography variant="h4">Əli Cəfərli</Typography>
          <Button sx={{ bgcolor: 'rgba(51, 51, 51, 0.19)', borderRadius: '20px', padding: '6px 12px' }}>
            <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>Qoşul</Typography>
          </Button>
        </Box>
        <Typography variant="subtitle1" sx={{ my: 2 }}>React development. Open source is great for many things.</Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box className="flex-column">
            <Typography variant="h6">4940</Typography>
            <Typography variant="subtitle2" sx={{ color: '#000' }}>Üzv</Typography>
          </Box>
          <Box className="flex-column">
            <Typography variant="h6">235</Typography>
            <Box component={"span"} sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Box sx={{ bgcolor: 'rgba(4, 178, 31, 1)', borderRadius: '4px', width: '8px', height: '8px' }}></Box>
              <Typography variant="subtitle2" sx={{ color: '#000' }}>Online</Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ py: 1 }} />

        <Typography variant="h4" sx={{ pt: 2 }}>Əlaqəli qruplar</Typography>

        <List>
            <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt="User Name" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvpBo6xRmZDCwGiJWpK6Q0dHyO2rhJWXvTWcho93SblMjE2gH7-A-qW4BY0RRtS36MAeM&usqp=CAU" />
              </ListItemAvatar>
              <ListItemText className="flex-column" sx={{ alignItems: 'flex-start' }} primary={
                <Typography variant="subtitle1">Texnologiya</Typography>
              } secondary={
                <Typography variant="subtitle3">540 üzv</Typography>
              }  />
          </ListItem>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt="User Name" src="https://kurstap.az/imageDisplayer/displayProfileImage?photoPath=%2Fprojects%2Fkurstap%2Ffiles%2Fmain%2F390&photoName=5ac93f7b-bf1a-47c4-903a-5dd1ea73c669.jpg&dir=" />
              </ListItemAvatar>
              <ListItemText className="flex-column" sx={{ alignItems: 'flex-start' }} primary={
                <Typography variant="subtitle1">Dizayn</Typography>
              } secondary={
                <Typography variant="subtitle3">230 üzv</Typography>
              }  />
          </ListItem>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt="User Name" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScTp-X5AR3BWhhjFPX7MTSJ8CDjofUNPlDww&s" />
              </ListItemAvatar>
              <ListItemText className="flex-column" sx={{ alignItems: 'flex-start' }} primary={
                <Typography variant="subtitle1">Programlastirma</Typography>
              } secondary={
                <Typography variant="subtitle3">150 üzv</Typography>
              }  />
          </ListItem>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt="User Name" src="https://emsal.com/wp-content/uploads/2023/09/Insaat-Malzemesi-Sanayi-Uretimi.jpg" />
              </ListItemAvatar>
              <ListItemText className="flex-column" sx={{ alignItems: 'flex-start' }} primary={
                <Typography variant="subtitle1">Inssat</Typography>
              } secondary={
                <Typography variant="subtitle3">720 üzv</Typography>
              }  />
          </ListItem>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar alt="User Name" src="https://www.csgroup.az/images/blog/1670824161-muhasibat-xidmetleri-300x300.jpg" />
              </ListItemAvatar>
              <ListItemText className="flex-column" sx={{ alignItems: 'flex-start' }} primary={
                <Typography variant="subtitle1">Muhasibatliq</Typography>
              } secondary={
                <Typography variant="subtitle3">512 üzv</Typography>
              }  />
          </ListItem>
            </Link>
        </List>

        <Divider />

        <Typography variant="h4" sx={{ py: 2 }}>Əlaqəli məqalələr</Typography>

        <List>
          <ListItem sx={{ px: 0 }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>What does your codding mean?</Link>
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>What does your codding mean?</Link>
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>What does your codding mean?</Link>
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>What does your codding mean?</Link>
          </ListItem>
        </List>

      </Box>
    </Grid>
  )
}

export default PostRightbar