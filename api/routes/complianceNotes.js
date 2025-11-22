import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// POST /api/compliance-notes - Add compliance note
router.post("/", async (req, res) => {
  try {
    const { patientId, note, createdBy } = req.body;
    
    if (!patientId || !note) {
      return res.status(400).json({ error: "patientId and note are required" });
    }
    
    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    
    const complianceNote = {
      note,
      createdBy: createdBy || "Provider",
      createdAt: new Date(),
    };
    
    patient.complianceNotes.push(complianceNote);
    await patient.save();
    
    // Return the note with id
    const savedNote = patient.complianceNotes[patient.complianceNotes.length - 1];
    const noteResponse = {
      id: savedNote._id.toString(),
      patientId: patient._id.toString(),
      note: savedNote.note,
      createdAt: savedNote.createdAt.toISOString(),
      createdBy: savedNote.createdBy,
    };
    
    res.status(201).json(noteResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

