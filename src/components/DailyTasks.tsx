import {
  Box,
  Typography,
  Card,
  Grid,
  Paper,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  TrendingUp,
  Assignment,
} from "@mui/icons-material";

interface Task {
  id: number;
  task: string;
  target: number;
  completed: number;
  unit: string;
  status: string;
}

interface DailyTasksProps {
  tasks: Task[];
}

const DailyTasks = ({ tasks }: DailyTasksProps) => {
  const getCompletionPercentage = (completed: number, target: number) => {
    return Math.min((completed / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "#4caf50";
    if (percentage >= 75) return "#ff9800";
    if (percentage >= 50) return "#2196f3";
    return "#f44336";
  };

  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const totalTasks = tasks.length;

  return (
    <Paper
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Assignment sx={{ fontSize: 32, mr: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Today's Tasks
        </Typography>
        <Chip
          label={`${completedTasks}/${totalTasks} Completed`}
          sx={{
            bgcolor: "rgba(255,255,255,0.2)",
            color: "white",
            fontWeight: 600,
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
          Overall Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(completedTasks / totalTasks) * 100}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.2)",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#4caf50",
              borderRadius: 4,
            },
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {tasks.map((task) => {
          const percentage = getCompletionPercentage(task.completed, task.target);
          const progressColor = getProgressColor(percentage);
          
          return (
            <Grid item xs={12} sm={6} key={task.id}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  border: task.status === "completed" ? "2px solid #4caf50" : "1px solid rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ mr: 2, mt: 0.5 }}>
                    {task.status === "completed" ? (
                      <CheckCircle sx={{ color: "#4caf50", fontSize: 24 }} />
                    ) : (
                      <RadioButtonUnchecked sx={{ color: "#9e9e9e", fontSize: 24 }} />
                    )}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        mb: 1,
                        textDecoration: task.status === "completed" ? "line-through" : "none",
                      }}
                    >
                      {task.task}
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <TrendingUp sx={{ fontSize: 16, color: progressColor, mr: 1 }} />
                      <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                        {task.completed}/{task.target} {task.unit}
                      </Typography>
                      <Chip
                        label={`${percentage.toFixed(0)}%`}
                        size="small"
                        sx={{
                          ml: "auto",
                          bgcolor: progressColor,
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      />
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: progressColor,
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default DailyTasks;