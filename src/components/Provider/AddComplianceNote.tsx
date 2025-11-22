import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useComplianceNotes } from "../../hooks/useComplianceNotes";

interface AddComplianceNoteProps {
  patientId: string;
  onNoteAdded: () => void;
}

const PREDEFINED_NOTES = [
  "Patient missed daily goals",
  "Completed appointments",
  "Lifestyle change recommended",
];

const AddComplianceNote: React.FC<AddComplianceNoteProps> = ({ patientId, onNoteAdded }) => {
  const [note, setNote] = useState("");
  const [selectedPredefined, setSelectedPredefined] = useState("");
  const [customNote, setCustomNote] = useState("");
  const { addComplianceNote, loading, error } = useComplianceNotes();

  const handlePredefinedChange = (value: string) => {
    setSelectedPredefined(value);
    if (value && value !== "custom") {
      setNote(value);
      setCustomNote("");
    } else {
      setNote("");
    }
  };

  const handleCustomNoteChange = (value: string) => {
    setCustomNote(value);
    setNote(value);
    if (value) {
      setSelectedPredefined("custom");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) {
      return;
    }

    const result = await addComplianceNote({
      patientId,
      note: note.trim(),
      createdBy: "Provider", // In a real app, this would come from auth context
    });

    if (result) {
      setNote("");
      setCustomNote("");
      setSelectedPredefined("");
      onNoteAdded();
    }
  };

  return (
    <Box className="mb-4">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth className="mb-3">
          <InputLabel>Select or Add Note</InputLabel>
          <Select
            value={selectedPredefined}
            label="Select or Add Note"
            onChange={(e) => handlePredefinedChange(e.target.value)}
          >
            <MenuItem value="">
              <em>Select a predefined note or add custom</em>
            </MenuItem>
            {PREDEFINED_NOTES.map((predefinedNote) => (
              <MenuItem key={predefinedNote} value={predefinedNote}>
                {predefinedNote}
              </MenuItem>
            ))}
            <MenuItem value="custom">Add Custom Note</MenuItem>
          </Select>
        </FormControl>

        {(selectedPredefined === "custom" || !selectedPredefined) && (
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Enter custom compliance note..."
            value={customNote}
            onChange={(e) => handleCustomNoteChange(e.target.value)}
            className="mb-3"
          />
        )}

        {error && (
          <Alert severity="error" className="mb-3">
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !note.trim()}
          className="w-full md:w-auto"
        >
          {loading ? "Adding..." : "Add Compliance Note"}
        </Button>
      </form>
    </Box>
  );
};

export default AddComplianceNote;

