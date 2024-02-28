import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AuthContext from "../context/AuthContext";

const drawerWidth = 240;

function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = React.useContext(AuthContext);

  const navItems = [
    {
      id: 1,
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      text: "Quests",
      link: user ? "/quests" : "login",
    },
    {
      id: 3,
      text: user ? "Dashboard" : "Login",
      link: user ? "/dashboard" : "/login",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link to="/">
        <AcUnitIcon />
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Link to={item.link}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <AcUnitIcon fontSize="large" sx={{ color: "white" }} />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              textAlign: "right",
              display: { xs: "none", sm: "block" },
            }}
          >
            {navItems.map((item) => (
              <Link key={item.id} to={item.link}>
                <Button sx={{ color: "#fff" }}>{item.text}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navbar;
