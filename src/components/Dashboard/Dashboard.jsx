import * as React from "react";
import {
  Avatar,
  Stack,
  useMediaQuery,
  CssBaseline,
  Box,
  Typography,
  Divider,
  IconButton,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import loginPic from "../../assets/user-interface.png"
import dipnot_logo from "../../assets/dipnote-logo.svg";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import "./Dashboard.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Drawer,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../CustomMaterialComponents/CustomMaterialComponents";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function Dashboard({ token }) {
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width:769px)");
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.authReducer.userInfo);

  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    });
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const searchText = data.get("searchText");

    navigate(`/search?key=${searchText}`);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        open={open}
        sx={{
          bgcolor: "#fff",
          boxShadow: `
              0px 2px 4px -1px rgba(0,0,0,0.04),
              0px 4px 5px 0px rgba(0,0,0,0.04),
              0px 1px 10px 0px rgba(0,0,0,0.04)
            `,
          height: "90px",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            p: 0,
            pr: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="#000"
            noWrap
            sx={{
              flexGrow: 1,
              display: "flex",
              px: 3,
              alignItems: "center",
              pr: !matches && 0,
            }}
          >
            <IconButton
              edge="start"
              color="#000"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "10px",
                display: matches ? "none" : "block",
              }}
            >
              <MenuIcon
                sx={{
                  fontSize: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </IconButton>
            <Search sx={{ height: "100%" }} onSubmit={handleSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                name="searchText"
                placeholder="Axtar…"
                sx={{ width: "100%" }}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Typography>
          <Stack direction="row" spacing={matches ? 2 : 1}>
            <IconButton color="#000" sx={{ bgcolor: "rgba(231, 231, 231, 1)" }}>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton color="#000" sx={{ bgcolor: "rgba(231, 231, 231, 1)" }}>
              <NotificationsNoneIcon />
            </IconButton>
            <Link
              to={token ? "/profile" : "/login"}
              style={{ textDecoration: "none" }}
            >
              <Avatar alt={`${userInfo.username}`} src={token ? userInfo.picture : loginPic}>
                {userInfo?.first_name?.[0]?.toUpperCase()}
                {userInfo?.last_name?.[0].toUpperCase()}
              </Avatar>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ height: "fit-content" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: matches ? "center" : "space-between",
            px: [1],
            height: "90px",
          }}
        >
          <Link to={"/"}>
            <Box>
              <Box component={"img"} src={dipnot_logo} alt="dipnot-logo" />
            </Box>
          </Link>
          <IconButton
            edge="start"
            color="#000"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "10px",
              display: matches ? "none" : "block",
            }}
          >
            <CloseIcon
              sx={{
                fontSize: "30px",
                display: "flex",
                alignItems: "center",
              }}
            />
          </IconButton>
        </Toolbar>
        <Divider />
        <SidebarMenu setOpen={setOpen} />
      </Drawer>
    </>
  );
}

Dashboard.propTypes = {
  token: PropTypes.string.isRequired,
};
