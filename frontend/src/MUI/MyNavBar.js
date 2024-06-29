import * as React from "react";
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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { UseAuth } from "../Authentication/AuthContext";

const drawerWidth = 240;

function MyNavBar(props) {
  const { user, logout } = UseAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Silicon Software Services
      </Typography>
      <Divider />
      <List>
        {user.name === "" && (
          <>
            <NavLink to="/login">
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink to={"/register"}>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Register" />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </>
        )}

        {user.email === "admin@gmail.com" && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </ListItem>
        )}
        {user.name !== "" && (
          <NavLink to="/quiz">
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Quiz" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        )}
        <NavLink to="/profile">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText
              onClick={handleLogout}
              primary="Logout"
              sx={{ background: "red", color: "white", borderRadius: "10px" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" position="sticky">
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Silicon Software Services
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {localStorage.getItem("name") === "" && (
              <>
                <NavLink to="/login">
                  <Button sx={{ color: "#fff" }}>Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button sx={{ color: "#fff" }}>Register</Button>
                </NavLink>
              </>
            )}
            {localStorage.getItem("email") === "admin@gmail.com" && (
              <>
                <NavLink to="/admin">
                  <Button sx={{ color: "#fff" }}>Admin</Button>
                </NavLink>
              </>
            )}
            <NavLink
              to={localStorage.getItem("name") !== "" ? "/quiz" : "/login"}
            >
              <Button sx={{ color: "#fff" }}>Quiz</Button>
            </NavLink>
            <NavLink
              to={localStorage.getItem("name") !== "" ? "/profile" : "/login"}
            >
              <Button sx={{ color: "#fff" }}>Profile</Button>
            </NavLink>
            {localStorage.getItem("name") !== "" && (
              <>
                <NavLink to="/profile">
                  <Button
                    onClick={handleLogout}
                    sx={{ color: "#fff" }}
                    color="error"
                  >
                    Logout
                  </Button>
                </NavLink>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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

export default MyNavBar;
