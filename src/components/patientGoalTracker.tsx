import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import {
  DirectionsWalk,
  LocalDrink,
  Bedtime,
  FitnessCenter,
  Add,
  CheckCircle,
  RadioButtonUnchecked,
  Person,
  History,
  TrendingUp,
  CalendarToday,
} from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
// NOTE: Assuming this mockData file exists and is correctly structured
import mockData from "../data/mockData.json"; 

function PatientGoalTracker() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [dailyLog, setDailyLog] = useState({
    steps: "",
    water: "",
    sleep: "",
    customGoal: "",
  });

  // Using mock data for initial state
  const patientInfo = mockData.patientInfo;
  const [dailyTasks, setDailyTasks] = useState(mockData.dailyTasks);
  const [history, setHistory] = useState(mockData.history);

  const handleInputChange = (field: string, value: string) => {
    setDailyLog((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validate that at least one field has data
    if (!dailyLog.steps && !dailyLog.water && !dailyLog.sleep && !dailyLog.customGoal) {
      alert("Please enter at least one value before saving.");
      return;
    }

    // Validate numeric inputs
    if (dailyLog.steps && (parseInt(dailyLog.steps) < 0 || parseInt(dailyLog.steps) > 50000)) {
      alert("Steps must be between 0 and 50,000");
      return;
    }
    if (dailyLog.water && (parseFloat(dailyLog.water) < 0 || parseFloat(dailyLog.water) > 10)) {
      alert("Water intake must be between 0 and 10 liters");
      return;
    }
    if (dailyLog.sleep && (parseFloat(dailyLog.sleep) < 0 || parseFloat(dailyLog.sleep) > 24)) {
      alert("Sleep hours must be between 0 and 24");
      return;
    }

    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      steps: parseInt(dailyLog.steps) || 0,
      water: parseFloat(dailyLog.water) || 0,
      sleep: parseFloat(dailyLog.sleep) || 0,
      customGoal: dailyLog.customGoal || "",
    };
    
    // Update daily tasks with new values
    const updatedTasks = dailyTasks.map(task => {
      if (task.unit === "steps" && dailyLog.steps) {
        const newCompleted = parseInt(dailyLog.steps);
        return { ...task, completed: newCompleted, status: newCompleted >= task.target ? "completed" : "incomplete" };
      }
      if (task.unit === "L" && dailyLog.water) {
        const newCompleted = parseFloat(dailyLog.water);
        return { ...task, completed: newCompleted, status: newCompleted >= task.target ? "completed" : "incomplete" };
      }
      if (task.unit === "hrs" && dailyLog.sleep) {
        const newCompleted = parseFloat(dailyLog.sleep);
        return { ...task, completed: newCompleted, status: newCompleted >= task.target ? "completed" : "incomplete" };
      }
      return task;
    });
    
    setDailyTasks(updatedTasks);
    // Add new log to the beginning of the history array
    setHistory([newEntry, ...history]); 
    // Clear the form
    setDailyLog({ steps: "", water: "", sleep: "", customGoal: "" }); 
    setShowAddForm(false);
  };

  const getCompletionPercentage = (completed: number, target: number) => {
    return Math.min((completed / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "#4caf50";
    if (percentage >= 75) return "#ff9800";
    if (percentage >= 50) return "#2196f3";
    return "#f44336";
  };

  const getHistoryIcon = (type: string) => {
    switch (type) {
      case "steps": return <DirectionsWalk sx={{ fontSize: 20, color: "#00897B" }} />;
      case "water": return <LocalDrink sx={{ fontSize: 20, color: "#0288D1" }} />;
      case "sleep": return <Bedtime sx={{ fontSize: 20, color: "#673AB7" }} />;
      default: return <FitnessCenter sx={{ fontSize: 20, color: "#FF5722" }} />;
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4, width: '100%' }}>
      {/* Main Content Layout */}
      <Grid container spacing={4} sx={{ minHeight: '100vh' }}>
        
        {/* === Left Side (75% on medium/large screens: md={9}) === */}
        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Patient Info */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: "#f8f9fa" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Person sx={{ fontSize: 32, color: "#00897B", mr: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, color: "#00897B" }}>
                {patientInfo.name}
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Patient ID: {patientInfo.id} | Age: {patientInfo.age}
            </Typography>
          </Paper>

          {/* Daily Tasks Status */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Today's Tasks
            </Typography>
            <Grid container spacing={2}>
              {dailyTasks.map((task) => (
                <Grid item xs={12} sm={6} key={task.id}>
                  <Card sx={{ 
                    p: 2, 
                    // Highlight completed tasks with a border
                    border: task.status === "completed" ? "2px solid #4caf50" : "1px solid #e0e0e0" 
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Checkbox Icon */}
                        {task.status === "completed" ? (
                          <CheckCircle sx={{ color: "#4caf50", mr: 1 }} />
                        ) : (
                          <RadioButtonUnchecked sx={{ color: "#9e9e9e", mr: 1 }} />
                        )}
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {task.task}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {task.completed}/{task.target} {task.unit} ({getCompletionPercentage(task.completed, task.target).toFixed(0)}%)
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={getCompletionPercentage(task.completed, task.target)}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: "#f0f0f0",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: getProgressColor(getCompletionPercentage(task.completed, task.target)),
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Add Button - Visible when form is hidden */}
          {!showAddForm && (
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={() => setShowAddForm(true)}
                sx={{
                  bgcolor: "#00897B",
                  "&:hover": { bgcolor: "#00695C" },
                  px: 4,
                  py: 1.5,
                }}
              >
                Add Daily Log
              </Button>
            </Box>
          )}

          {/* Daily Logging Form - Visible when button is clicked */}
          {showAddForm && (
            <Paper 
              sx={{ 
                p: 3, 
                mb: 4,
                // MODIFICATIONS START: Constrain and center the form within the 75% column
                maxWidth: "800px", 
                mx: "auto", 
                // MODIFICATIONS END
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Create Daily Log
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {/* Steps Input */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <DirectionsWalk sx={{ fontSize: 40, color: "#00897B", mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Steps
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="Enter steps"
                        value={dailyLog.steps}
                        onChange={(e) => handleInputChange("steps", e.target.value)}
                        variant="outlined"
                        size="small"
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Water Input */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <LocalDrink sx={{ fontSize: 40, color: "#0288D1", mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Water (L)
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="Enter liters"
                        value={dailyLog.water}
                        onChange={(e) => handleInputChange("water", e.target.value)}
                        variant="outlined"
                        size="small"
                        inputProps={{ step: "0.1" }}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Sleep Input */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Bedtime sx={{ fontSize: 40, color: "#673AB7", mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Sleep (hrs)
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="Enter hours"
                        value={dailyLog.sleep}
                        onChange={(e) => handleInputChange("sleep", e.target.value)}
                        variant="outlined"
                        size="small"
                        inputProps={{ step: "0.1" }}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Custom Goal Input */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <FitnessCenter sx={{ fontSize: 40, color: "#FF5722", mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Custom Goal
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Health provider goal"
                        value={dailyLog.customGoal}
                        onChange={(e) => handleInputChange("customGoal", e.target.value)}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Save and Cancel Buttons */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    bgcolor: "#00897B",
                    "&:hover": { bgcolor: "#00695C" },
                    px: 4,
                  }}
                >
                  Save Daily Log
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowAddForm(false)}
                  sx={{ px: 4 }}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>

        {/* === Right Side - History Section (25% on medium/large screens: md={3}) === */}
        <Grid item xs={12} md={3} sx={{ display: 'flex' }}>
          <Paper 
            sx={{
              p: 2,
              height: "500px",
              width: '100%',
              position: "sticky", 
              top: 20, 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <History sx={{ fontSize: 28, mr: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Activity History
              </Typography>
            </Box>
            
            {/* Scrollable History List */}
            <Box 
              sx={{
                height: "400px",
                overflowY: "auto",
                pr: 1,
                // Custom scrollbar styles for a cleaner look
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "3px",
                  "&:hover": {
                    background: "rgba(255,255,255,0.5)",
                  },
                },
              }}
            >
              {history && history.length > 0 ? history.map((entry, index) => (
                <Card 
                  key={index}
                  sx={{
                    mb: 2,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <CalendarToday sx={{ fontSize: 18, color: "#666", mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      {/* Steps Log */}
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {getHistoryIcon("steps")}
                          <Typography variant="body2" sx={{ ml: 1, color: "#555" }}>Steps</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
                            {entry.steps.toLocaleString()}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min((entry.steps / 10000) * 100, 100)}
                            sx={{
                              width: 60,
                              height: 4,
                              borderRadius: 2,
                              bgcolor: "#f0f0f0",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: getProgressColor((entry.steps / 10000) * 100),
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      
                      {/* Water Log */}
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {getHistoryIcon("water")}
                          <Typography variant="body2" sx={{ ml: 1, color: "#555" }}>Water</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
                            {entry.water}L
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min((entry.water / 2) * 100, 100)}
                            sx={{
                              width: 60,
                              height: 4,
                              borderRadius: 2,
                              bgcolor: "#f0f0f0",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: getProgressColor((entry.water / 2) * 100),
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      
                      {/* Sleep Log */}
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {getHistoryIcon("sleep")}
                          <Typography variant="body2" sx={{ ml: 1, color: "#555" }}>Sleep</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
                            {entry.sleep}h
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min((entry.sleep / 8) * 100, 100)}
                            sx={{
                              width: 60,
                              height: 4,
                              borderRadius: 2,
                              bgcolor: "#f0f0f0",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: getProgressColor((entry.sleep / 8) * 100),
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      
                      {/* Custom Goal Note */}
                      {entry.customGoal && (
                        <Box sx={{ mt: 1, p: 1, bgcolor: "rgba(0,137,123,0.1)", borderRadius: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                            {getHistoryIcon("custom")}
                            <Typography variant="caption" sx={{ ml: 1, color: "#666", fontWeight: 600 }}>
                              Custom Goal
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: "#555", fontSize: "0.8rem" }}>
                            {entry.customGoal}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              )) : (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    No history available yet.
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    Add your first daily log to see it here!
                  </Typography>
                </Box>
              )}
            </Box>
            
            {/* Scroll Indicator */}
            <Box sx={{ 
              position: "absolute", 
              bottom: 20, 
              right: 20,
              display: "flex",
              alignItems: "center",
              gap: 1,
              opacity: 0.7,
              color: 'white' 
            }}>
              <TrendingUp sx={{ fontSize: 16 }} />
              <Typography variant="caption">Scroll for more</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PatientGoalTracker;