import {apiBaseUrl} from "../constants";
import axios from "axios";
import {Diagnosis} from "../types";

const getAllDiagnoses = async () => {
  const diagnosis = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/`);
  return diagnosis.data;
};

export default {
  getAllDiagnoses
};