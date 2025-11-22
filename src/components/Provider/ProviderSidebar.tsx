import * as React from "react";
import { useNavigate, useLocation } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const drawerWidth = 240;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/provider",
  },
  {
    text: "Patients",
    icon: <PeopleIcon />,
    path: "/provider",
  },
  {
    text: "Reports",
    icon: <AssessmentIcon />,
    path: "/provider/reports",
  },
  {
    text: "Compliance Notes",
    icon: <NoteAddIcon />,
    path: "/provider/notes",
  },
];

const bottomMenuItems: MenuItem[] = [
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/provider/settings",
  },
];

interface ProviderSidebarProps {
  window?: () => Window;
}

export default function ProviderSidebar(props: ProviderSidebarProps) {
  const { window } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window && window().innerWidth < 600) {
      handleDrawerClose();
    }
  };

  const drawer = (
    <div className="h-full flex flex-col">
      <Toolbar className="bg-blue-600">
        <Box className="flex items-center gap-2">
          <LocalHospitalIcon className="text-white" />
          <Typography variant="h6" noWrap component="div" className="text-white font-semibold">
            Provider Portal
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List className="flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/provider" && location.pathname.startsWith("/provider") && 
             !location.pathname.startsWith("/provider/reports") && 
             !location.pathname.startsWith("/provider/notes") &&
             !location.pathname.startsWith("/provider/settings"));
          
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive}
                className={isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}
              >
                <ListItemIcon className={isActive ? "text-blue-600" : ""}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  className={isActive ? "text-blue-600 font-semibold" : ""}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {bottomMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive}
                className={isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}
              >
                <ListItemIcon className={isActive ? "text-blue-600" : ""}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  className={isActive ? "text-blue-600 font-semibold" : ""}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation("/")}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "primary.main",
        }}
      >
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
          <Typography variant="h6" noWrap component="div">
            Health Care Provider Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="provider navigation"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
    </>
  );
}

