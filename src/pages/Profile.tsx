/**
 * Profile Page
 *
 * User profile management page.
 * Displays and allows editing of user information.
 *
 * TODO: Implement profile features
 * - Display user information
 * - Edit profile form
 * - Upload profile picture
 * - Change password
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { ArrowBack, Logout } from "@mui/icons-material";
import { ROUTES } from "../navigation/routes";

const Profile = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate(ROUTES.LOGIN);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F0F7F7" }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={2}
        sx={{
          background: "linear-gradient(135deg, #00897B 0%, #0288D1 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(ROUTES.DASHBOARD)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Profile
          </Typography>
          <Avatar
            onClick={handleMenuOpen}
            sx={{
              bgcolor: "#4FC3F7",
              border: "2px solid white",
              cursor: "pointer",
            }}
          >
            JD
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} fontSize="small" />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 20px 60px rgba(0, 137, 123, 0.15)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                sx={{ mb: 3, fontWeight: 600, color: "#00897B" }}
              >
                User Profile
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                This is a placeholder for the Profile page. Implement your
                profile features here.
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate(ROUTES.DASHBOARD)}
                  sx={{
                    background:
                      "linear-gradient(135deg, #00897B 0%, #0288D1 100%)",
                  }}
                >
                  Back to Dashboard
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(ROUTES.SETTINGS)}
                >
                  Go to Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Profile;
