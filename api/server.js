import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import patientRoutes from "./routes/patients.js";
import complianceNoteRoutes from "./routes/complianceNotes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/compliance-notes", complianceNoteRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Health Care API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});

