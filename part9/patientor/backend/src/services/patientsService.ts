import patients from "../../data/patients";
import { Entry, NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const newPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const entries: Entry[] = [];
  const newPatient = { id, entries, ...patient };

  patients.push(newPatient);
  return newPatient;
};

const getNonSensitivePatientById = (
  id: string,
): NonSensitivePatient | undefined => {
  const patient = patients.find((patient) => patient.id === id);

  if (!patient) return undefined;
  else
    return {
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      name: patient.name,
      occupation: patient.occupation,
      id: patient?.id,
    };
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getAllNonSensitivePatients,
  newPatient,
  getNonSensitivePatientById,
  getPatientById,
};
