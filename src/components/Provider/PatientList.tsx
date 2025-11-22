import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { usePatients } from "../../hooks/usePatients";
import type { ComplianceStatus } from "../../types/patient";

const PatientList: React.FC<{ onPatientSelect: (patientId: string) => void }> = ({ onPatientSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [complianceFilter, setComplianceFilter] = useState<ComplianceStatus | "All">("All");
  const { patients, loading, error } = usePatients({ searchQuery, complianceFilter });

  const getComplianceColor = (status: ComplianceStatus) => {
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="mb-4">
        {error}
      </Alert>
    );
  }

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6 font-bold">
        Patient List
      </Typography>

      {/* Search and Filter */}
      <Grid container spacing={2} className="mb-6">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search patients by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon className="mr-2 text-gray-400" />,
            }}
            className="bg-white"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth className="bg-white">
            <InputLabel>Filter by Compliance</InputLabel>
            <Select
              value={complianceFilter}
              label="Filter by Compliance"
              onChange={(e) => setComplianceFilter(e.target.value as ComplianceStatus | "All")}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Patient Cards */}
      {patients.length === 0 ? (
        <Alert severity="info">No patients found</Alert>
      ) : (
        <Grid container spacing={3}>
          {patients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} key={patient.id}>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow h-full"
                onClick={() => onPatientSelect(patient.id)}
              >
                <CardContent>
                  <Typography variant="h6" className="mb-2 font-semibold">
                    {patient.name}
                  </Typography>
                  <Typography variant="body2" className="mb-2 text-gray-600">
                    {patient.email}
                  </Typography>
                  <Typography variant="body2" className="mb-3 text-gray-600">
                    {patient.phone}
                  </Typography>
                  <Box className="flex items-center justify-between">
                    <Chip
                      label={patient.complianceStatus}
                      color={getComplianceColor(patient.complianceStatus)}
                      size="small"
                    />
                    <Typography variant="caption" className="text-gray-500">
                      Score: {patient.complianceScore}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PatientList;

