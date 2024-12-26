import patients from "../../data/patients";
import {NonSensitivePatient, Patient} from "../types";

const getAllPatients = (): Patient[] => {
    return patients;
};

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getAllPatients,
    getAllNonSensitivePatients,
};