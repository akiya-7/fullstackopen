import axios from "axios";
import {Patient, PatientFormValues, NewEntry, Entry} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (patientId: Patient["id"], object: NewEntry) => {
  const entry = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, object);
  return entry.data;
};

const getById = async (id: string) => {
  const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return patient.data;
};

export default {
  getAll, create, getById, createEntry
};

