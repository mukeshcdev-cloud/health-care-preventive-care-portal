import { useState, useEffect } from "react";
import { api } from "../utils/api";
import type { PatientDetail } from "../types/patient";

export const usePatientDetail = (patientId: string | null) => {
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!patientId) {
      setPatient(null);
      setLoading(false);
      return;
    }

    const fetchPatientDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.get<PatientDetail>(`/patients/${patientId}`);
        setPatient(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch patient details");
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetail();
  }, [patientId]);

  return { patient, loading, error, refetch: () => {
    if (!patientId) return;
    const fetchPatientDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.get<PatientDetail>(`/patients/${patientId}`);
        setPatient(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch patient details");
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientDetail();
  } };
};

