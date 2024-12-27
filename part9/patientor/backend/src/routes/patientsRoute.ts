import express, { Response } from "express";
import patientsService from "../services/patientsService";
import { NewPatient, NonSensitivePatient } from "../types";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getAllNonSensitivePatients());
  return;
});

router.post("/", (req, res) => {
  try {
    const validate: NewPatient = toNewPatient(req.body);
    const newPatient = patientsService.newPatient(validate);

    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage: string = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json(errorMessage);
  }
});

export default router;
