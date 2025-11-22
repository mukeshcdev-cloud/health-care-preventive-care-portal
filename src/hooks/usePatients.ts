import { useState, useEffect } from "react";
import { api } from "../utils/api";
import type { Patient, ComplianceStatus } from "../types/patient";

interface UsePatientsParams {
  searchQuery?: string;
  complianceFilter?: ComplianceStatus | "All";
}

export const usePatients = ({ searchQuery = "", complianceFilter = "All" }: UsePatientsParams = {}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.get<Patient[]>("/patients");
        
        // Filter patients based on search and compliance
        let filtered = data;
        
        if (searchQuery) {
          filtered = filtered.filter(
            (patient) =>
              patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              patient.email.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        if (complianceFilter !== "All") {
          filtered = filtered.filter((patient) => patient.complianceStatus === complianceFilter);
        }
        
        setPatients(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch patients");
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [searchQuery, complianceFilter]);

  return { patients, loading, error, refetch: () => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.get<Patient[]>("/patients");
        setPatients(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch patients");
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  } };
};

