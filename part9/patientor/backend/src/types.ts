export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
  placeholder: unknown;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id" | "entries">;
