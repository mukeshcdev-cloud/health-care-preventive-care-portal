import React, { useState } from "react";
import { Box } from "@mui/material";
import PatientList from "./PatientList";
import PatientDetailView from "./PatientDetailView";

const Provider: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handleBack = () => {
    setSelectedPatientId(null);
  };

  const handleNoteAdded = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <Box className="bg-gray-50 min-h-full">
      {showSuccessMessage && (
        <Box className="fixed top-4 right-4 z-50">
          <Box className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Compliance note added successfully!
          </Box>
        </Box>
      )}
      {selectedPatientId ? (
        <PatientDetailView
          patientId={selectedPatientId}
          onBack={handleBack}
          onNoteAdded={handleNoteAdded}
        />
      ) : (
        <PatientList onPatientSelect={handlePatientSelect} />
      )}
    </Box>
  );
};

export default Provider;

