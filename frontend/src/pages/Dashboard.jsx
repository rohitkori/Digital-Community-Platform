import React, { useState } from "react";
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
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import InterestsIcon from "@mui/icons-material/Interests";
import MyProfile from "../components/Dashboard/MyProfile";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import AuthContext from "../contexts/AuthContext";

const drawerWidth = 240;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [tab, setTab] = useState(0);
  const [mode, setMode] = useState("light");
  // const { user, logoutUser } = useContext(AuthContext);
  const user = {
    name: "Yuvraj",
  };
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleDrawerClose = () => {
    // setIsClosing(true);
    setMobileOpen(false);
  };
  // const handleDrawerTransitionEnd = () => {
  //   setIsClosing(false);
  // };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const Items = [
    {
      id: 1,
      text: "My Profile",
      icon: <InterestsIcon className="text-[#A0A0A0]" />,
      component: <MyProfile data={user} />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List className="text-end">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tab}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {Items.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                bgcolor: "background.paper",
                // give visible box shadow to selected tab

                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                margin: "auto",
                width: "100%",
                paddingLeft: "30px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
              onClick={() => setTab(index)}
            >
              <IconButton className="gap-2">{item.icon}</IconButton>
              <Tab
                label={item.text}
                {...a11yProps(index)}
                className="p-0"
              ></Tab>
            </Box>
          ))}
        </Tabs>
      </List>
      <List>
        <ListItem disablePadding className="text-red-600">
          <ListItemButton
            // onClick={logoutUser}
            sx={{
              bgcolor: "background.paper",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              margin: "auto",
              width: "100%",
              paddingLeft: "30px",
            }}
          >
            <IconButton>
              <LogoutIcon />
            </IconButton>
            <ListItemText primary="Logout" className="p-0" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              DASHBOARD
            </Typography>
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            // onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
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
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {/* <Toolbar /> */}
          {Items.map((item, index) => (
            <TabPanel
              key={item.id}
              value={tab}
              index={index}
              //   sx={{
              //     width: "100%",
              //   }}
            >
              {item.component}
            </TabPanel>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
