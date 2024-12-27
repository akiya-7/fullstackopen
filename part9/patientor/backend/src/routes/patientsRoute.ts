import express, { Response } from "express";
import patientsService from "../services/patientsService";
import {NewPatient, NonSensitivePatient} from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientsService.getAllNonSensitivePatients());
    return;
});

router.post("/", (req, res: Response<NewPatient>) => {
    const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    const newPatient: NewPatient = patientsService.newPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });

    res.send(newPatient);
});

export default router;
