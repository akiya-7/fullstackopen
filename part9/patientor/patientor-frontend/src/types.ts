export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface AbstractBaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface IHealthCheckEntry extends AbstractBaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface IHospitalEntry extends AbstractBaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface IOccupationalHealthcareEntry extends AbstractBaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | IHospitalEntry
  | IOccupationalHealthcareEntry
  | IHealthCheckEntry;