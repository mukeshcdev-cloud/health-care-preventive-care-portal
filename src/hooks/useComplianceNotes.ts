import { useState } from "react";
import { api } from "../utils/api";
import type { ComplianceNote } from "../types/patient";

interface AddComplianceNoteParams {
  patientId: string;
  note: string;
  createdBy: string;
}

export const useComplianceNotes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComplianceNote = async ({ patientId, note, createdBy }: AddComplianceNoteParams): Promise<ComplianceNote | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.post<ComplianceNote>("/compliance-notes", {
        patientId,
        note,
        createdBy,
      });
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add compliance note");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addComplianceNote, loading, error };
};

