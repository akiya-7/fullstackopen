import express, { Response } from "express";
import patientsService from "../services/patientsService";
import { NewPatient, NonSensitivePatient } from "../types";
import { zodToNewPatient } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getAllNonSensitivePatients());
  return;
});

router.post("/", (req, res) => {
  try {
    const validate: NewPatient = zodToNewPatient(req.body);
    const newPatient = patientsService.newPatient(validate);

    res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(400).json({ error: "An unknown error occurred." });
    }
  }
});

export default router;
