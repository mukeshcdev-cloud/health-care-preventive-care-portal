export type ComplianceStatus = "Low" | "Medium" | "High";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  complianceStatus: ComplianceStatus;
  complianceScore: number;
  assignedDate: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: "active" | "completed" | "pending";
}

export interface DailyLog {
  id: string;
  date: string;
  steps: number;
  sleepHours: number;
  notes?: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export interface ComplianceNote {
  id: string;
  patientId: string;
  note: string;
  createdAt: string;
  createdBy: string;
}

export interface PatientDetail extends Patient {
  goals: Goal[];
  dailyLogs: DailyLog[];
  reminders: Reminder[];
  complianceNotes: ComplianceNote[];
}

