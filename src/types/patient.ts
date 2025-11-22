export type ComplianceStatus = "High" | "Medium" | "Low";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  complianceStatus: ComplianceStatus;
  complianceScore: number;
}
