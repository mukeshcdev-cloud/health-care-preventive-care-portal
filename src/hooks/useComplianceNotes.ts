import { useState } from "react";
import { api } from "../utils/api";

interface AddComplianceNoteData {
  patientId: string;
  note: string;
  createdBy: string;
}

interface ComplianceNoteResponse {
  id: string;
  patientId: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

export const useComplianceNotes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComplianceNote = async (data: AddComplianceNoteData): Promise<ComplianceNoteResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<ComplianceNoteResponse>("/compliance-notes", data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add compliance note");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    addComplianceNote,
    loading,
    error,
  };
};
