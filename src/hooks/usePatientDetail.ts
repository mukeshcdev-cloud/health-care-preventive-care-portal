import { useState, useEffect } from "react";
import { api } from "../utils/api";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  status: string;
  deadline: string;
}

interface DailyLog {
  id: string;
  date: string;
  steps: number;
  sleepHours: number;
  notes?: string;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  dueDate: string;
}

interface ComplianceNote {
  id: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  complianceStatus: string;
  complianceScore: number;
  goals: Goal[];
  dailyLogs: DailyLog[];
  reminders: Reminder[];
  complianceNotes: ComplianceNote[];
}

export const usePatientDetail = (patientId: string) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get<Patient>(`/patients/${patientId}`);
      setPatient(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch patient details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  return {
    patient,
    loading,
    error,
    refetch: fetchPatient,
  };
};
