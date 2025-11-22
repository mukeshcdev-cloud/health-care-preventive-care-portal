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

        // Build query params
        const params = new URLSearchParams();
        if (searchQuery) {
          params.append("search", searchQuery);
        }
        if (complianceFilter && complianceFilter !== "All") {
          params.append("compliance", complianceFilter);
        }

        const queryString = params.toString();
        const endpoint = `/patients${queryString ? `?${queryString}` : ""}`;

        const data = await api.get<Patient[]>(endpoint);
        setPatients(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [searchQuery, complianceFilter]);

  return {
    patients,
    loading,
    error,
  };
};
