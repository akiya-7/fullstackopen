import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getAllPatients = (): Patient[] => {
  return patients;
};

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
  const newPatient = { id, ...patient };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  newPatient,
};
