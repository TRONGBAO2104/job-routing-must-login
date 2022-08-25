import React, { useState, useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

// Logout Button
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

// Swith Mode
import Switch from "@mui/material/Switch";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

// Dark Mode nice UI verson haha
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (!auth.loggedIn) {
      navigate("/login");
    }
  };

  const handleSignOut = () => {
    if (auth.loggedIn) {
      navigate("/");
      auth.setLoggedIn(false);
    }
  };

  const toggleThemeChange = () => {
    auth.setDarkMode(!auth.darkMode);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
              mr: 2,
            }}
            onClick={() => navigate("/")}
          >
            Job Routing by BaoBao
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>

        {/* <Switch checked={auth.darkMode} onClick={toggleThemeChange} /> */}
        <Button
          onClick={toggleThemeChange}
          sx={{
            display: "flex",
            height: "35px",
            alignItems: "center",
            justifyContent: "center",
            color: "text.primary",
            borderRadius: 1,
          }}
        >
          {auth.theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} color="inherit">
            {auth.theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
          {auth.loggedIn ? (
            <Button color="inherit" onClick={handleSignOut}>
              <LogoutIcon sx={{ mr: 1.5 }} />
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleSignIn}>
              <LogoutIcon sx={{ mr: 1.5 }} />
              Login
            </Button>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}
