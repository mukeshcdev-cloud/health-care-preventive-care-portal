import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  LinearProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { usePatientDetail } from "../../hooks/usePatientDetail";
import AddComplianceNote from "./AddComplianceNote";

interface PatientDetailViewProps {
  patientId: string;
  onBack: () => void;
  onNoteAdded: () => void;
}

const PatientDetailView: React.FC<PatientDetailViewProps> = ({ patientId, onBack, onNoteAdded }) => {
  const { patient, loading, error, refetch } = usePatientDetail(patientId);

  const handleNoteAdded = () => {
    refetch();
    onNoteAdded();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !patient) {
    return (
      <Box className="p-6">
        <Alert severity="error">{error || "Patient not found"}</Alert>
      </Box>
    );
  }

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "High":
        return "success";
      case "Medium":
        return "warning";
      case "Low":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box className="p-6">
      {/* Header */}
      <Box className="flex items-center mb-6">
        <IconButton onClick={onBack} className="mr-2">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" className="font-bold">
          {patient.name}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Patient Info Card */}
        <Grid item xs={12} md={4}>
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold">
                Patient Information
              </Typography>
              <Typography variant="body2" className="mb-2">
                <strong>Email:</strong> {patient.email}
              </Typography>
              <Typography variant="body2" className="mb-2">
                <strong>Phone:</strong> {patient.phone}
              </Typography>
              <Box className="mt-4">
                <Typography variant="body2" className="mb-2">
                  <strong>Compliance Status:</strong>
                </Typography>
                <Chip
                  label={patient.complianceStatus}
                  color={getComplianceColor(patient.complianceStatus)}
                  className="mb-2"
                />
              </Box>
              <Box className="mt-4">
                <Typography variant="body2" className="mb-2">
                  <strong>Compliance Score:</strong> {patient.complianceScore}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={patient.complianceScore}
                  className="h-2 rounded"
                  color={patient.complianceScore >= 70 ? "success" : patient.complianceScore >= 40 ? "warning" : "error"}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Goals Card */}
        <Grid item xs={12} md={8}>
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold">
                Goals
              </Typography>
              {patient.goals.length === 0 ? (
                <Typography variant="body2" className="text-gray-500">
                  No goals set
                </Typography>
              ) : (
                <List>
                  {patient.goals.map((goal, index) => (
                    <React.Fragment key={goal.id}>
                      <ListItem>
                        <ListItemText
                          primary={goal.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" className="text-gray-600">
                                {goal.description}
                              </Typography>
                              <Box className="mt-2">
                                <Typography variant="caption" className="text-gray-500">
                                  Progress: {goal.currentValue} / {goal.targetValue} {goal.unit}
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={(goal.currentValue / goal.targetValue) * 100}
                                  className="mt-1 h-2 rounded"
                                />
                              </Box>
                              <Box className="mt-2 flex items-center gap-2">
                                <Chip
                                  label={goal.status}
                                  size="small"
                                  color={goal.status === "completed" ? "success" : goal.status === "active" ? "primary" : "default"}
                                />
                                <Typography variant="caption" className="text-gray-500">
                                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < patient.goals.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Daily Logs Card */}
        <Grid item xs={12} md={6}>
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold">
                Daily Logs
              </Typography>
              {patient.dailyLogs.length === 0 ? (
                <Typography variant="body2" className="text-gray-500">
                  No daily logs available
                </Typography>
              ) : (
                <List>
                  {patient.dailyLogs.slice(0, 5).map((log, index) => (
                    <React.Fragment key={log.id}>
                      <ListItem>
                        <ListItemText
                          primary={new Date(log.date).toLocaleDateString()}
                          secondary={
                            <Box>
                              <Typography variant="body2" className="text-gray-600">
                                Steps: {log.steps.toLocaleString()}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                Sleep: {log.sleepHours} hours
                              </Typography>
                              {log.notes && (
                                <Typography variant="caption" className="text-gray-500 mt-1 block">
                                  {log.notes}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < Math.min(patient.dailyLogs.length, 5) - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Reminders Card */}
        <Grid item xs={12} md={6}>
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold">
                Reminders
              </Typography>
              {patient.reminders.length === 0 ? (
                <Typography variant="body2" className="text-gray-500">
                  No reminders
                </Typography>
              ) : (
                <List>
                  {patient.reminders.map((reminder, index) => (
                    <React.Fragment key={reminder.id}>
                      <ListItem>
                        <ListItemText
                          primary={reminder.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" className="text-gray-600">
                                {reminder.description}
                              </Typography>
                              <Box className="mt-2 flex items-center gap-2">
                                <Chip
                                  label={reminder.priority}
                                  size="small"
                                  color={
                                    reminder.priority === "high"
                                      ? "error"
                                      : reminder.priority === "medium"
                                      ? "warning"
                                      : "default"
                                  }
                                />
                                <Chip
                                  label={reminder.completed ? "Completed" : "Pending"}
                                  size="small"
                                  color={reminder.completed ? "success" : "default"}
                                />
                                <Typography variant="caption" className="text-gray-500">
                                  Due: {new Date(reminder.dueDate).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < patient.reminders.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Compliance Notes Card */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold">
                Compliance Notes
              </Typography>
              <AddComplianceNote patientId={patientId} onNoteAdded={handleNoteAdded} />
              {patient.complianceNotes.length === 0 ? (
                <Typography variant="body2" className="text-gray-500 mt-4">
                  No compliance notes yet
                </Typography>
              ) : (
                <List className="mt-4">
                  {patient.complianceNotes.map((note, index) => (
                    <React.Fragment key={note.id}>
                      <ListItem>
                        <ListItemText
                          primary={note.note}
                          secondary={
                            <Box>
                              <Typography variant="caption" className="text-gray-500">
                                Added by {note.createdBy} on {new Date(note.createdAt).toLocaleString()}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < patient.complianceNotes.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDetailView;

