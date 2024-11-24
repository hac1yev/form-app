import { Link, useLocation } from "react-router-dom";
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LogoutIcon from "@mui/icons-material/Logout";
import "./SidebarMenu.scss";
import useGetAxios from "../../hooks/useGetAxios";
import { useEffect } from "react";
import PropTypes from "prop-types";

const SidebarMenu = ({ setOpen }) => {
  const { pathname } = useLocation();
  const categories = useGetAxios() || [];

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload()
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    }
  }, [pathname, setOpen]);

  return (
    <Box className="sidebar-wrapper">
      <List sx={{ pb: "10px" }}>
        <Link to="/">
          <ListItem
            disablePadding
            className={
              pathname === "/"
                ? "sidebar-list-item active"
                : "sidebar-list-item"
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Ana səhifə" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/posts/popular">
          <ListItem
            disablePadding
            className={
              pathname === "/posts/popular"
                ? "sidebar-list-item active"
                : "sidebar-list-item"
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Populyar" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider />

      <Box
        sx={{
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Qruplar</Typography>
        <Box
          component={"span"}
          sx={{
            borderRadius: "14.59px",
            bgcolor: "rgba(0, 32, 67, 1)",
            padding: "1px 12px",
            color: "#fff",
          }}
        >
          19
        </Box>
      </Box>

      <List
        className="sidebar-menu-groups"
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Website Design" secondary="679 üzv" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Frontend Development" secondary="537 üzv" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Software Development" secondary="324 üzv" />
        </ListItem>
      </List>

      <Link to="/">
        <Button variant="outlined">Hamısına bax</Button>
      </Link>

      <Divider sx={{ py: 1 }} />

      <Box
        sx={{
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Kategoriyalar</Typography>
      </Box>

      <Box
        sx={{ p: 2, display: "flex", flexDirection: "column", gap: "12px" }}
        className="sidebar-menu-category"
      >
        {categories?.slice(0, 3).map((category) => (
          <Link
            to={`/category-posts?category_id=${category?.id}`}
            key={category?.id}
          >
            <Typography variant="subtitle1">{category?.name}</Typography>
          </Link>
        ))}
      </Box>

      <Link to="/">
        <Button variant="outlined">Hamısına bax</Button>
      </Link>

      <Divider sx={{ py: 1 }} />

      <List sx={{ pb: "10px" }}>
        {/* <Link to="/">
          <ListItem disablePadding className="sidebar-list-item">
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <HelpOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Kömək" />
            </ListItemButton>
          </ListItem>
        </Link> */}
        {/* <Link to="/">
          <ListItem disablePadding className="sidebar-list-item">
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <BuildOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="App & Tools" />
            </ListItemButton>
          </ListItem>
        </Link> */}
        <Link  onClick={handleLogout}>
          <ListItem disablePadding className="sidebar-list-item">
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Profildən Çıx" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

SidebarMenu.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default SidebarMenu;
