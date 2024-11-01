import * as React from "react";
import { Avatar, InputBase, Stack, useMediaQuery, CssBaseline, Box, Typography, Divider, IconButton, Toolbar } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import dipnot_logo from "../../assets/dipnote-logo.svg";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import "./Dashboard.scss";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 340;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...{
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  [theme.breakpoints.down("769")]: {
    width: "100%",
  },
}));

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  border: "1px solid #ccc",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "90%",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "70%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      [theme.breakpoints.up("sm")]: {
        width: 0,
      },
    }),
    [theme.breakpoints.down("769")]: {
      ...(open && {
        width: "100vw",
        zIndex: 2000,
      }),
    },
  },
}));

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width:769px)");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    }else{
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
              <IconButton
                color="#000"
                sx={{ bgcolor: "rgba(231, 231, 231, 1)" }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton
                color="#000"
                sx={{ bgcolor: "rgba(231, 231, 231, 1)" }}
              >
                <NotificationsNoneIcon />
              </IconButton>
              <Link to="/profile">
                <Avatar alt="Remy Sharp" src="" />
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
            <Link to="/">
              <Box
                component="img"
                sx={{
                  width: 193,
                  height: 43,
                }}
                alt="The house from the offer."
                src={dipnot_logo}
              />
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
          <Divider/>
          <SidebarMenu />
        </Drawer>
      </>
  );
}
