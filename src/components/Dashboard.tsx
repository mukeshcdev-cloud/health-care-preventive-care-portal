import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import {
  DirectionsWalk,
  Bedtime,
  LocalDrink,
  LocalFireDepartment,
  CalendarToday,
  NotificationsActive,
  Lightbulb,
  Menu as MenuIcon,
  Notifications,
} from "@mui/icons-material";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import "./Dashboard.css";
import WeeklyBarChart from "./WeeklyBarChart";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/mainReducer";

const Dashboard = () => {
  const reminders = [
    {
      title: "Annual Blood Test",
      date: "25 Jan 2025",
      icon: <CalendarToday color="primary" />,
    },
    {
      title: "Dental Checkup",
      date: "10 Feb 2025",
      icon: <NotificationsActive color="secondary" />,
    },
    {
      title: "Eye Examination",
      date: "15 Feb 2025",
      icon: <CalendarToday color="primary" />,
    },
  ];
  const theme = useTheme();
  const patientDashboard = useSelector(
    (store: RootState) => store.root.patientDashboard
  );
  const wellnessData = {
    steps: { current: patientDashboard.stepsTaken, goal: 10000 },
    sleep: {
      current: patientDashboard.sleepHours.reduce(
        (acc, { value }) => acc + value,
        0
      ),
      goal: 8 * 7,
    },
    hydration: { current: patientDashboard.hydration, goal: 2 },
    calories: { current: patientDashboard.calories, goal: 500 },
  };
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "#F0F7F7" }}>
      {/* Header / Navbar */}
      <AppBar
        position="static"
        elevation={2}
        sx={{
          background: "linear-gradient(135deg, #00897B 0%, #0288D1 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Wellness Dashboard
          </Typography>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Notifications />
          </IconButton>
          <Avatar
            sx={{
              bgcolor: "#4FC3F7",
              border: "2px solid white",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/profile")}
            title="Open profile"
          >
            JD
          </Avatar>
        </Toolbar>
      </AppBar>
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Wellness Goals Progress */}
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, color: theme.palette.primary.main }}
        >
          Today's Wellness Goals
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 3,
          }}
        >
          {/* Steps */}
          <Card className="wellness-card">
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  mb: 2,
                }}
              >
                <DirectionsWalk
                  sx={{ fontSize: 32, color: theme.palette.primary.main }}
                />
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Steps
              </Typography>
              <CircularProgressWithLabel
                value={
                  (wellnessData.steps.current / wellnessData.steps.goal) * 100
                }
                color={theme.palette.primary.main}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {wellnessData.steps.current.toLocaleString()} /{" "}
                {wellnessData.steps.goal.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>

          {/* Sleep */}
          <Card className="wellness-card">
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  bgcolor: "rgba(103, 58, 183, 0.1)",
                  mb: 2,
                }}
              >
                <Bedtime
                  sx={{ fontSize: 32, color: theme.palette.accent.main }}
                />
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Sleep
              </Typography>
              <WeeklyBarChart data={patientDashboard.sleepHours} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {wellnessData.sleep.current}h / {wellnessData.sleep.goal}h
              </Typography>
            </CardContent>
          </Card>

          {/* Hydration */}
          <Card className="wellness-card">
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  bgcolor: "rgba(2, 136, 209, 0.1)",
                  mb: 2,
                }}
              >
                <LocalDrink sx={{ fontSize: 32, color: "#0288D1" }} />
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Hydration
              </Typography>
              <CircularProgressWithLabel
                value={
                  (wellnessData.hydration.current /
                    wellnessData.hydration.goal) *
                  100
                }
                color="#0288D1"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {wellnessData.hydration.current}L /{" "}
                {wellnessData.hydration.goal}L
              </Typography>
            </CardContent>
          </Card>

          {/* Calories */}
          <Card className="wellness-card">
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  bgcolor: "rgba(255, 87, 34, 0.1)",
                  mb: 2,
                }}
              >
                <LocalFireDepartment sx={{ fontSize: 32, color: "#FF5722" }} />
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Calories
              </Typography>
              <CircularProgressWithLabel
                value={
                  (wellnessData.calories.current / wellnessData.calories.goal) *
                    100 <
                  100
                    ? (wellnessData.calories.current /
                        wellnessData.calories.goal) *
                      100
                    : 100
                }
                color="#FF5722"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {wellnessData.calories.current} / {wellnessData.calories.goal}{" "}
                kcal
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
          }}
        >
          {/* Health Tip of the Day */}
          <Card
            className="wellness-card"
            sx={{
              background:
                "linear-gradient(135deg, rgba(0, 137, 123, 0.05) 0%, rgba(2, 136, 209, 0.05) 100%)",
              border: "2px solid rgba(0, 137, 123, 0.1)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "#FFC107",
                    mr: 2,
                  }}
                >
                  <Lightbulb sx={{ fontSize: 28, color: "white" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                >
                  Health Tip of the Day
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, color: "text.primary" }}
              >
                💧 Drink at least 2 liters of water daily to improve organ
                function, boost energy levels, and maintain healthy skin. Start
                your morning with a glass of water!
              </Typography>
            </CardContent>
          </Card>

          {/* Preventive Care Reminders */}
          <Card className="wellness-card">
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                Preventive Care Reminders
              </Typography>
              <List sx={{ p: 0 }}>
                {reminders.map((reminder, index) => (
                  <Box key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {reminder.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={reminder.title}
                        secondary={`Upcoming: ${reminder.date}`}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                    {index < reminders.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
