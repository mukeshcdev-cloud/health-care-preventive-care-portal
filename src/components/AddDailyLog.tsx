import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Fade,
} from "@mui/material";
import {
  DirectionsWalk,
  LocalDrink,
  Bedtime,
  FitnessCenter,
  Save,
  Cancel,
} from "@mui/icons-material";

interface AddDailyLogProps {
  onSave: (log: any) => void;
  onCancel: () => void;
}

const AddDailyLog = ({ onSave, onCancel }: AddDailyLogProps) => {
  const [dailyLog, setDailyLog] = useState({
    steps: "",
    water: "",
    sleep: "",
    customGoal: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setDailyLog((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      steps: parseInt(dailyLog.steps) || 0,
      water: parseFloat(dailyLog.water) || 0,
      sleep: parseFloat(dailyLog.sleep) || 0,
      customGoal: dailyLog.customGoal,
    };
    onSave(newEntry);
    setDailyLog({ steps: "", water: "", sleep: "", customGoal: "" });
  };

  const logCards = [
    {
      field: "steps",
      title: "Steps",
      icon: <DirectionsWalk sx={{ fontSize: 40, color: "#00897B" }} />,
      placeholder: "Enter steps",
      type: "number",
      color: "#00897B",
    },
    {
      field: "water",
      title: "Water (L)",
      icon: <LocalDrink sx={{ fontSize: 40, color: "#0288D1" }} />,
      placeholder: "Enter liters",
      type: "number",
      color: "#0288D1",
      step: "0.1",
    },
    {
      field: "sleep",
      title: "Sleep (hrs)",
      icon: <Bedtime sx={{ fontSize: 40, color: "#673AB7" }} />,
      placeholder: "Enter hours",
      type: "number",
      color: "#673AB7",
      step: "0.1",
    },
    {
      field: "customGoal",
      title: "Custom Goal",
      icon: <FitnessCenter sx={{ fontSize: 40, color: "#FF5722" }} />,
      placeholder: "Health provider goal",
      type: "text",
      color: "#FF5722",
      multiline: true,
    },
  ];

  return (
    <Fade in timeout={500}>
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            textAlign: "center",
            background: "linear-gradient(45deg, #00897B, #0288D1)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Create Daily Log
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {logCards.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.field}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      bgcolor: `${card.color}15`,
                      mb: 2,
                      border: `2px solid ${card.color}30`,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {card.title}
                  </Typography>
                  <TextField
                    fullWidth
                    type={card.type}
                    placeholder={card.placeholder}
                    value={dailyLog[card.field as keyof typeof dailyLog]}
                    onChange={(e) => handleInputChange(card.field, e.target.value)}
                    variant="outlined"
                    size="small"
                    multiline={card.multiline}
                    rows={card.multiline ? 2 : 1}
                    inputProps={{ step: card.step }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: card.color,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: card.color,
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              background: "linear-gradient(45deg, #00897B, #00695C)",
              boxShadow: "0 4px 15px rgba(0, 137, 123, 0.3)",
              "&:hover": {
                background: "linear-gradient(45deg, #00695C, #004D40)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0, 137, 123, 0.4)",
              },
            }}
          >
            Save Daily Log
          </Button>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={onCancel}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              borderColor: "#9e9e9e",
              color: "#666",
              "&:hover": {
                borderColor: "#666",
                bgcolor: "#f5f5f5",
                transform: "translateY(-2px)",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
};

export default AddDailyLog;