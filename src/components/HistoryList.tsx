import {
  Box,
  Typography,
  Card,
  Paper,
  Avatar,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import {
  DirectionsWalk,
  LocalDrink,
  Bedtime,
  FitnessCenter,
  History,
  CalendarToday,
} from "@mui/icons-material";

interface HistoryEntry {
  date: string;
  steps: number;
  water: number;
  sleep: number;
  customGoal: string;
}

interface HistoryListProps {
  history: HistoryEntry[];
}

const HistoryList = ({ history }: HistoryListProps) => {
  const getScoreColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 100) return "#4caf50";
    if (percentage >= 75) return "#ff9800";
    if (percentage >= 50) return "#2196f3";
    return "#f44336";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    };
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -30,
          left: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <History sx={{ fontSize: 32, mr: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Activity History
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {history.map((entry, index) => {
          const dateInfo = formatDate(entry.date);
          
          return (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(8px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* Date Section */}
                  <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#667eea",
                        width: 60,
                        height: 60,
                        mr: 2,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                      }}
                    >
                      {dateInfo.day}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ color: "#333", fontWeight: 600 }}>
                        {dateInfo.month}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {dateInfo.weekday}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider orientation="vertical" flexItem sx={{ mr: 4 }} />

                  {/* Metrics Section */}
                  <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <DirectionsWalk sx={{ fontSize: 20, color: "#00897B", mr: 1 }} />
                        <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                          Steps
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: "#333", fontWeight: 600 }}>
                        {entry.steps.toLocaleString()}
                      </Typography>
                      <Chip
                        size="small"
                        label={`${((entry.steps / 10000) * 100).toFixed(0)}%`}
                        sx={{
                          bgcolor: getScoreColor(entry.steps, 10000),
                          color: "white",
                          fontSize: "0.7rem",
                          height: 20,
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocalDrink sx={{ fontSize: 20, color: "#0288D1", mr: 1 }} />
                        <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                          Water
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: "#333", fontWeight: 600 }}>
                        {entry.water}L
                      </Typography>
                      <Chip
                        size="small"
                        label={`${((entry.water / 2) * 100).toFixed(0)}%`}
                        sx={{
                          bgcolor: getScoreColor(entry.water, 2),
                          color: "white",
                          fontSize: "0.7rem",
                          height: 20,
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Bedtime sx={{ fontSize: 20, color: "#673AB7", mr: 1 }} />
                        <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                          Sleep
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: "#333", fontWeight: 600 }}>
                        {entry.sleep}h
                      </Typography>
                      <Chip
                        size="small"
                        label={`${((entry.sleep / 8) * 100).toFixed(0)}%`}
                        sx={{
                          bgcolor: getScoreColor(entry.sleep, 8),
                          color: "white",
                          fontSize: "0.7rem",
                          height: 20,
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <FitnessCenter sx={{ fontSize: 20, color: "#FF5722", mr: 1 }} />
                        <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                          Goal
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#333",
                          fontWeight: 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "120px",
                        }}
                      >
                        {entry.customGoal}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {history.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CalendarToday sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" sx={{ opacity: 0.8 }}>
            No history available yet
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            Start logging your daily activities to see your progress here
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default HistoryList;