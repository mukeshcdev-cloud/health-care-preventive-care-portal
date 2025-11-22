import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetValue: { type: Number, required: true },
  currentValue: { type: Number, default: 0 },
  unit: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ["active", "completed", "pending"], default: "active" },
}, { _id: true });

const dailyLogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  steps: { type: Number, default: 0 },
  sleepHours: { type: Number, default: 0 },
  notes: { type: String },
}, { _id: true });

const reminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
}, { _id: true });

const complianceNoteSchema = new mongoose.Schema({
  note: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
}, { _id: true });

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  complianceStatus: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  complianceScore: { type: Number, min: 0, max: 100, default: 50 },
  assignedDate: { type: Date, default: Date.now },
  goals: [goalSchema],
  dailyLogs: [dailyLogSchema],
  reminders: [reminderSchema],
  complianceNotes: [complianceNoteSchema],
}, {
  timestamps: true,
});

// Transform _id to id in JSON response
patientSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    
    // Convert dates to ISO strings
    if (ret.assignedDate) {
      ret.assignedDate = ret.assignedDate.toISOString();
    }
    
    // Transform nested documents
    if (ret.goals) {
      ret.goals = ret.goals.map(goal => {
        goal.id = goal._id.toString();
        delete goal._id;
        if (goal.deadline) {
          goal.deadline = goal.deadline.toISOString();
        }
        return goal;
      });
    }
    if (ret.dailyLogs) {
      ret.dailyLogs = ret.dailyLogs.map(log => {
        log.id = log._id.toString();
        delete log._id;
        if (log.date) {
          log.date = log.date.toISOString();
        }
        return log;
      });
    }
    if (ret.reminders) {
      ret.reminders = ret.reminders.map(reminder => {
        reminder.id = reminder._id.toString();
        delete reminder._id;
        if (reminder.dueDate) {
          reminder.dueDate = reminder.dueDate.toISOString();
        }
        return reminder;
      });
    }
    if (ret.complianceNotes) {
      ret.complianceNotes = ret.complianceNotes.map(note => {
        note.id = note._id.toString();
        delete note._id;
        if (note.createdAt) {
          note.createdAt = note.createdAt.toISOString();
        }
        return note;
      });
    }
    
    return ret;
  },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;

