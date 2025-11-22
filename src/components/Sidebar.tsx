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
import HomeIcon from "@mui/icons-material/Home";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";

const drawerWidth = 240;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    text: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    text: "Provider Portal",
    icon: <LocalHospitalIcon />,
    path: "/provider",
  },
  {
    text: "Patients",
    icon: <PeopleIcon />,
    path: "/patients",
  },
  {
    text: "Profile",
    icon: <PersonIcon />,
    path: "/profile",
  },
  {
    text: "Reports",
    icon: <AssessmentIcon />,
    path: "/reports",
  },
];

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
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
            Health Care Portal
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List className="flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/" && location.pathname === "/") ||
            (item.path === "/provider" && location.pathname.startsWith("/provider"));
          
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive}
                className={isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderLeft: "4px solid #2563eb",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.15)",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isActive ? "#2563eb" : "inherit",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#2563eb" : "inherit",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
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
            Health Care Wellness and Preventive Care Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation menu"
      >
        <Drawer
          container={window !== undefined ? () => window().document.body : undefined}
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
