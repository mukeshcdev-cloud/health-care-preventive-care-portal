import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// GET /api/patients - Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find({}).select("-goals -dailyLogs -reminders -complianceNotes");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/patients/:id - Get patient detail
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/compliance-notes - Add compliance note
router.post("/:id/compliance-notes", async (req, res) => {
  try {
    const { note, createdBy } = req.body;
    const patient = await Patient.findById(req.params.id);
    
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

